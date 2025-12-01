export const validarUsaurioClave = (datos) => {
    if (!datos || typeof datos !== "object") {
      return res.status(400).json({
        estado: false,
        mensaje: "Se necesita usuario y contraseña para registrar al usuario"
      });
    }

    const { usuario, clave } = datos;

    if (!usuario || typeof usuario !== "string" || !usuario.trim()) {
      return res.status(400).json({
        estado: false,
        mensaje: "Se necesita nombre de usuario"
      });
    }

    if (!clave || typeof clave !== "string" || !clave.trim()) {
      return res.status(400).json({
        estado: false,
        mensaje: "Se necesita su contraseña"
      });
    }
}