import * as repo from "../repositories/medicoRepository.js"

export function obtemUmMedicoPorId(id:number){
    const medico = repo.buscaMedicoPorId(id);
    if (!medico) throw new Error("Médico não encontrado")
};
