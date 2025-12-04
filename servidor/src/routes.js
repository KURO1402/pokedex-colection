import express from "express";
import { 
    loginUsuarioController, 
    registrarUsuarioController,
    cambiarRolUsuarioController
} from "./usuarios.js";

import { verificarToken, verificarRoles } from "./middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registrarUsuarioController);
router.post("/login", loginUsuarioController);
router.patch("/cambiar-rol/:idUsuario", verificarToken, verificarRoles(2), cambiarRolUsuarioController);

export default router;