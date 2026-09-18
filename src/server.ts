import express from "express";

const app = express(); 
app.use(express.json()); // dizer que o app vai usar json como padrao nas req e res http

const PORT: number = 3000;

interface Usuario {
    id: number,
    nome: string,
    telefone: string
};

const usuarios: Usuario[] = [];

usuarios.push(
    {id: 1, nome: "Andrey", telefone: "234567"},
    {id: 2, nome: "Fernanda", telefone: "8765432"}
);

// GET: Listar todos os usuários
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
}); 

// GET: Buscar usuário por ID
app.get("/usuarios/:id", (req, res) => { // id é um path veriable
    const idProcurado: number = Number(req.params.id);
    const usuarioEncontrado: Usuario | undefined = usuarios.find(
        (usuario) => usuario.id === idProcurado
    );

    if (usuarioEncontrado) {
        res.json(usuarioEncontrado);
    } else {
        res.status(404).json({ erro: `Usuário de id ${idProcurado} não encontrado!` });
    }
});

// POST: Adicionar novo usuário
app.post("/usuarios", (req, res) => {
    const { nome, telefone } = req.body;

    // Validação básica
    if (!nome || !telefone) {
        return res.status(400).json({ erro: "Nome e telefone são obrigatórios!" });
    }

    // Gerar um ID automático baseado no último ID da lista (ou 1 se estiver vazia)
    const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

    const novoUsuario: Usuario = {
        id: novoId,
        nome,
        telefone
    };

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario); // 201 sig. -> CREATED (post quando dar sucessor devolve 201)
});

// PUT: Atualizar usuário existente
app.put("/usuarios/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);
    const { nome, telefone } = req.body;

    const index = usuarios.findIndex((usuario) => usuario.id === idProcurado);

    if (index === -1) {
        return res.status(404).json({ erro: `Usuário de id ${idProcurado} não encontrado!` });
    }

    // Atualiza apenas os campos enviados ou mantém os antigos
    usuarios[index] = {
        id: idProcurado,
        nome: nome || usuarios[index].nome,
        telefone: telefone || usuarios[index].telefone
    };

    res.json(usuarios[index]);
});

// DELETE: Remover usuário
app.delete("/usuarios/:id", (req, res) => {
    const idProcurado: number = Number(req.params.id);
    const index = usuarios.findIndex((usuario) => usuario.id = idProcurado);

    if (index === -1) {
        return res.status(404).json({ erro: `Usuário de id ${idProcurado} não encontrado!` });
    }

    // Remove o usuário do array usando o índice encontrado
    const usuarioRemovido = usuarios.splice(index, 1);

    res.status(204).json({ // 204 - NO CONTENT
        mensagem: `Usuário de id ${idProcurado} removido com sucesso!`,
        usuario: usuarioRemovido[0]
    });
});

app.listen(PORT, () => {
    console.log(`API subiu na porta ${PORT}`);
});