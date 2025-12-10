import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { pool } from './config/db.js';
import { validarUsaurioClave } from './validaciones.js';
import { json } from 'express';

export const registrarUsuarioController = async (req, res) => {
  try {
    validarUsaurioClave(req.body);
    const { usuario, clave } = req.body;

    const usuarioExiste = await pool.query(
      "SELECT nombre FROM usuarios WHERE nombre = $1",
      [usuario]
    );

    if (usuarioExiste.rows.length > 0) {
      return res.status(409).json({
        estado: false,
        mensaje: "El nombre de usuario ya esta en uso"
      });
    }

    const result = await pool.query(
      "INSERT INTO usuarios(nombre, clave) VALUES ($1, md5($2)) RETURNING id_usuario, nombre, id_rol",
      [usuario, clave]
    );

    const token = jwt.sign(
      result.rows[0],
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      estado: true,
      mensaje: "Cuenta creada exitosamente",
      usuario: result.rows[0],
      token: token
    });

  } catch (error) {
    console.error("Error al registrar usuario:", error.message);

    return res.status(error.status || 500).json({
      estado: false,
      mensaje: error.message || "Error interno del servidor"
    });
  }
};

export const loginUsuarioController = async (req, res) => {
  try {
    validarUsaurioClave(req.body)
    const { usuario, clave } = req.body;

    const result = await pool.query(
      "SELECT id_usuario, nombre, id_rol FROM usuarios WHERE nombre = $1 AND clave = md5($2)",
      [usuario, clave]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        estado: false,
        mensaje: "Usuario o contraseña incorrectos"
      });
    }

    const token = jwt.sign(
      result.rows[0],
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      estado: true,
      mensaje: "Login correcto",
      usuario: result.rows[0],
      token: token
    });

  } catch (error) {
    console.error("Error en login:", error.message);

    return res.status(error.status || 500).json({
      estado: false,
      mensaje: error.message || "Error interno del servidor"
    });
  }
};

export const cambiarRolUsuarioController = async (req, res) => {
  try {
    const { idRol } = req.body;
    const { idUsuario } = req.params;
    const { rows } = await pool.query("SELECT id_rol FROM roles");
    const rolesPermitidos = rows.map(r => Number(r.id_rol));

    if (!rolesPermitidos.includes(Number(idRol))) {
      const error = new Error("El rol solo puede ser 1 o 2");
      error.status = 400;
      throw error;
    }
    const resultado = await pool.query(
      "SELECT id_usuario, nombre, id_rol FROM usuarios WHERE id_usuario = $1",
      [idUsuario]
    );

    if (resultado.rows.length === 0) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      throw error;
    }

    const user = resultado.rows[0];

    if (user.id_rol === 2) {
      const error = new Error("No puedes cambiar el rol a un administrador");
      error.status = 403;
      throw error;
    }

    const result = await pool.query("UPDATE usuarios SET id_rol = $1 WHERE id_usuario = $2", [idRol, idUsuario]);
    if (result.rowCount === 0) {
      throw new Error("No se pudo actualizar rol de usuario");
    }

    return res.status(200).json({ estado: true, mensaje: "Rol de usuario actualizado correctamente" });

  } catch (error) {
    console.error("Error al cambiar rol usuario:", error.message);

    return res.status(error.status || 500).json({
      estado: false,
      mensaje: error.message || "Error interno del servidor"
    });
  }
};

export const actualizarNombreUsuarioController = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      const error = new Error("Se necesita nuevo nombre del usuario");
      error.status = 400;
      throw error;
    }

    const { nombreUsuario } = req.body;
    if (!nombreUsuario || typeof nombreUsuario !== "string" || !nombreUsuario.trim()) {
      const error = new Error("Se necesita nuevo nombre del usuario");
      error.status = 400;
      throw error;
    }
    const { id_usuario } = req.usuario;

    const result = await pool.query("UPDATE usuarios SET nombre = $1 WHERE id_usuario = $2", [nombreUsuario, id_usuario]);
    if (result.rowCount === 0) {
      throw new Error("No se pudo actualizar rol de usuario");
    }
    return res.status(200).json({ estado: true,  mensaje: "Nombre de usuario actualizado correctamente" });

  } catch (error) {
    console.error("Ocurrio un error al actualizar los datos de usuario: ", error.message);

    return res.status(error.status || 500).json({
      estado: false,
      mensaje: error.message || "Error interno del servidor"
    })
  }
};

export const actualizarClaveUsuarioController = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      const error = new Error("Se necesita la clave actual y la nueva clave");
      error.status = 400;
      throw error;
    }

    const { claveActual, nuevaClave } = req.body;

    if (!claveActual || typeof claveActual !== "string" || !claveActual.trim()){
      const error = new Error("Se necesita la clave actual");
      error.status = 400;
      throw error;
    }
    if(!nuevaClave || typeof nuevaClave !== "string" || !nuevaClave.trim()) {
      const error = new Error("Se necesita la nueva clave");
      error.status = 400;
      throw error;
    }

    const { id_usuario } = req.usuario;

    const verificar = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE id_usuario = $1 AND clave = md5($2)",
      [id_usuario, claveActual]
    );

    if (verificar.rowCount === 0) {
      const error = new Error("La clave actual es incorrecta");
      error.status = 400;
      throw error;
    }


    const result = await pool.query(
      "UPDATE usuarios SET clave = md5($1) WHERE id_usuario = $2",
      [nuevaClave, id_usuario]
    );

    if (result.rowCount === 0) {
      throw new Error("No se pudo actualizar la clave de usuario");
    }

    return res.status(200).json({
      estado: true,
      mensaje: "Clave actualizada correctamente"
    });

  } catch (error) {
    console.error("Ocurrió un error al actualizar la clave del usuario: ", error.message);

    return res.status(error.status || 500).json({
      estado: false,
      mensaje: error.message || "Error interno del servidor"
    });
  }
};

export const obtenerUsuariosController = async (req, res) => {
  try {
    const { id_usuario } = req.usuario;
    const { rows } = await pool.query("SELECT id_usuario, nombre, id_rol FROM usuarios WHERE id_usuario != $1", [id_usuario]);
    return res.status(200).json({ estado: true, usuarios: rows });
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);

    return res.status(error.status || 500).json({
      estado: false,
      mensaje: error.message || "Error interno del servidor"
    });
  }
}