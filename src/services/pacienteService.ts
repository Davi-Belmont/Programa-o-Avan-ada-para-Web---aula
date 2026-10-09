import * as repo from "../repositories//pacienteRepository.js"

export function obtemUmPacientePorId(id:number){
    const paciente = repo.buscaPaientePorId(id);
    if (!paciente) throw new Error("Paciente não encontrado")
};