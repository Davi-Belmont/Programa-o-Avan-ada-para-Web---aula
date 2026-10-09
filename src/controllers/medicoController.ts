import type { Request, Response } from "express";
import * as Service from "../services/medicoService.js";

export function obtemUmMedico(req:Request,res:Response){
    // dados da req
const id: number = Number(req.params.id);
const medicoEncontrado = Service.obtemUmMedicoPorId(id)
res.json(medicoEncontrado);

    // preparacao da res
};
