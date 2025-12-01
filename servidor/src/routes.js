import express from "express";
import { 
    loginUsuarioController, 
    registrarUsuarioController,
    cambiarRolUsuarioController
} from "./usuarios.js";

const router = express.Router();

router.post("/register", registrarUsuarioController);
router.post("/login", loginUsuarioController);
router.patch("/cambiar-rol/:idUsuario", cambiarRolUsuarioController);

export default router;