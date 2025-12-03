import express from "express";
import { 
    loginUsuarioController, 
    registrarUsuarioController,
    cambiarRolUsuarioController
} from "./usuarios.js";

import { verificarToken } from "./middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registrarUsuarioController);
router.post("/login", loginUsuarioController);
router.patch("/cambiar-rol/:idUsuario", verificarToken, cambiarRolUsuarioController);

export default router;