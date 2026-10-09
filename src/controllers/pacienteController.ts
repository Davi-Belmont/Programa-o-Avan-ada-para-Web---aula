import type { Request, Response } from "express";
import * as Service from "../services/pacienteService.js";

export function obtemUmPaciente(req:Request,res:Response){
    // dadps da req 
const id: number = Number(req.params.id);
const usuarioEncontrado = Service.obtemUmPacientePorId(id)
res.json(usuarioEncontrado);

    // preparacao da res
};