import * as repo from "../repositories/consultaRepository.js";

export function listarConsultas() {
    return repo.listarConsultas();
}

export function obtemConsultaPorId(id: number) {
    return repo.buscaConsultaPorId(id);
}

export function criaConsulta(dados: {
    data: string;
    turno: string;
    medico: string;
    paciente: string;
}) {
    return repo.criaConsulta(dados);
}

export function atualizaConsulta(
    id: number,
    dados: Partial<{ data: string; turno: string; medico: string; paciente: string }>
) {
    return repo.atualizaConsulta(id, dados);
}

export function removeConsulta(id: number) {
    return repo.removeConsulta(id);
}
