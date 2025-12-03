export const validarUsaurioClave = (datos) => {
    if (!datos || typeof datos !== "object") {
      const error = new Error("Se necesita usuario y contraseña para registrar al usuario");
      error.status = 400;
      throw error;
    }

    const { usuario, clave } = datos;

    if (!usuario || typeof usuario !== "string" || !usuario.trim()) {
      const error = new Error("Se necesita nombre de usuario");
      error.status = 400;
      throw error;
    }

    if (!clave || typeof clave !== "string" || !clave.trim()) {
      const error = new Error("Se necesita su contraseña");
      error.status = 400;
      throw error;
    }
}