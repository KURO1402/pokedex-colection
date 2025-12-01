import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { pool } from './config/db.js';
import { validarUsaurioClave } from './validaciones.js';

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
        mensaje: "El usuario ya existe"
      });
    }

    const result = await pool.query(
      "INSERT INTO usuarios(nombre, clave) VALUES ($1, md5($2)) RETURNING id_usuario, nombre",
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

    return res.status(500).json({
      estado: false,
      mensaje: "Error interno del servidor"
    });
  }
};

export const loginUsuarioController = async (req, res) => {
  try {
    validarUsaurioClave(req.body)
    const { usuario, clave } = req.body;

    const result = await pool.query(
      "SELECT id_usuario, nombre FROM usuarios WHERE nombre = $1 AND clave = md5($2)",
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

    return res.status(500).json({
      estado: false,
      mensaje: "Error interno del servidor"
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
    const result = await pool.query("UPDATE usuarios SET id_rol = $1 WHERE id_usuario = $2", [idRol, idUsuario]);
    if(result.rowCount === 0){
      throw new Error("No se pudo actualizar rol de usuario");
    }

    return res.status(200).json({mensaje: "Rol de usuario actualizado correctamente"});

  } catch (error) {
    console.error("Error al cambiar rol usuario:", error.message);

    return res.status(error.status || 500).json({
      estado: false,
      mensaje: error.message || "Error interno del servidor"
    });
  }
}