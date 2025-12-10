import express from "express";
import { 
    loginUsuarioController, 
    registrarUsuarioController,
    cambiarRolUsuarioController,
    obtenerUsuariosController,
    actualizarClaveUsuarioController,
    actualizarNombreUsuarioController
} from "./usuarios.js";

import { verificarToken, verificarRoles } from "./middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registrarUsuarioController);
router.post("/login", loginUsuarioController);
router.patch("/cambiar-rol/:idUsuario", verificarToken, verificarRoles(2), cambiarRolUsuarioController);
router.put("/actualizar-nombre", verificarToken, verificarRoles(1,2), actualizarNombreUsuarioController);
router.put("/actualizar-clave", verificarToken, verificarRoles(1,2), actualizarClaveUsuarioController);
router.get("/usuarios", verificarToken, verificarRoles(2), obtenerUsuariosController);

export default router;