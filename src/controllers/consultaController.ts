import type { Request, Response } from "express";
import * as Service from "../services/consultaService.js";

const camposObrigatorios = ["data", "turno", "medico", "paciente"] as const;

export function listaConsultas(_req: Request, res: Response) {
    res.json(Service.listarConsultas());
}

export function obtemConsulta(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    const consulta = Service.obtemConsultaPorId(id);
    if (!consulta) {
        return res.status(404).json({ erro: `Consulta de id ${id} não encontrada.` });
    }
    return res.json(consulta);
}

export function criaConsulta(req: Request, res: Response) {
    const dados = req.body;

    const faltando = camposObrigatorios.filter(
        (campo) => typeof dados?.[campo] !== "string" || !dados[campo].trim()
    );
    if (faltando.length > 0) {
        return res.status(400).json({
            erro: "Informe data, turno, medico e paciente como textos não vazios."
        });
    }

    const consulta = Service.criaConsulta({
        data: dados.data,
        turno: dados.turno,
        medico: dados.medico,
        paciente: dados.paciente
    });
    return res.status(201).json(consulta);
}

export function atualizaConsulta(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    const dados = req.body;
    const camposPermitidos = ["data", "turno", "medico", "paciente"] as const;
    for (const campo of camposPermitidos) {
        if (dados?.[campo] !== undefined &&
            (typeof dados[campo] !== "string" || !dados[campo].trim())) {
            return res.status(400).json({ erro: `O campo ${campo} deve ser um texto não vazio.` });
        }
    }

    const consulta = Service.atualizaConsulta(id, {
        data: dados?.data,
        turno: dados?.turno,
        medico: dados?.medico,
        paciente: dados?.paciente
    });
    if (!consulta) {
        return res.status(404).json({ erro: `Consulta de id ${id} não encontrada.` });
    }
    return res.json(consulta);
}

export function removeConsulta(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    const consulta = Service.removeConsulta(id);
    if (!consulta) {
        return res.status(404).json({ erro: `Consulta de id ${id} não encontrada.` });
    }
    return res.status(200).json({
        mensagem: "Consulta removida com sucesso.",
        consulta
    });
}
