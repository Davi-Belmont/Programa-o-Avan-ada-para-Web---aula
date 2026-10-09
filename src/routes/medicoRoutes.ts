import Router from "express";
import * as controller from "../controllers/medicoController.js"

const router = Router();

// router.get("/medicos");
router.get("/medicos/:id", controller.obtemUmMedico);

// post, put e delete

export default router;
