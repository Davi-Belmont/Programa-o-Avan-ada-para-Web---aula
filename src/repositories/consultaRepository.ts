export interface Consulta {
    id: number;
    data: string;
    turno: string;
    medico: string;
    paciente: string;
}

const consultas: Consulta[] = [];
let proximoId = 1;

export function listarConsultas(): Consulta[] {
    return consultas;
}

export function buscaConsultaPorId(id: number): Consulta | undefined {
    return consultas.find((consulta) => consulta.id === id);
}

export function criaConsulta(dados: Omit<Consulta, "id">): Consulta {
    const novaConsulta: Consulta = { id: proximoId++, ...dados };
    consultas.push(novaConsulta);
    return novaConsulta;
}

export function atualizaConsulta(
    id: number,
    dados: Partial<Omit<Consulta, "id">>
): Consulta | undefined {
    const consulta = buscaConsultaPorId(id);
    if (!consulta) return undefined;

    if (dados.data !== undefined) consulta.data = dados.data;
    if (dados.turno !== undefined) consulta.turno = dados.turno;
    if (dados.medico !== undefined) consulta.medico = dados.medico;
    if (dados.paciente !== undefined) consulta.paciente = dados.paciente;

    return consulta;
}

export function removeConsulta(id: number): Consulta | undefined {
    const index = consultas.findIndex((consulta) => consulta.id === id);
    if (index === -1) return undefined;
    return consultas.splice(index, 1)[0];
}
