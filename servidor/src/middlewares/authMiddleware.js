import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verificarToken = (req, res, next) => {
    const autenticacionHeader = req.headers['authorization'];
    const token = autenticacionHeader && autenticacionHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, usuario) => {
        if (err) {
            return res.status(403).json({ estado: false, mensaje: 'Token inválido o expirado' });
        }
        req.usuario = usuario;
        next();
    });
}

export const verificarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    const { id_rol } = req.usuario;

    if (!rolesPermitidos.includes(id_rol)) {
      return res.status(403).json({ estado: false, mensage: 'No tienes permitido hacer esa accion.' });
    }

    next();
  };
};