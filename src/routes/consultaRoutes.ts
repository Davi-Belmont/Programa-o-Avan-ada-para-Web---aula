import { Router } from "express";
import * as controller from "../controllers/consultaController.js";

const router = Router();

router.get("/consultas", controller.listaConsultas);
router.get("/consultas/:id", controller.obtemConsulta);
router.post("/consultas", controller.criaConsulta);
router.put("/consultas/:id", controller.atualizaConsulta);
router.delete("/consultas/:id", controller.removeConsulta);

export default router;
