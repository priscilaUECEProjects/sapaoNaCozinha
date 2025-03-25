const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const cors = require("cors");
app.use(cors());

app.use(express.json());

//Página Cadastro
app.post("/USUARIOS", async (req, res) => {
    try{
        const { email, nome, senha } = req.body;

        const usuarioExistente = await prisma.USUARIOS.findUnique({
            where: { EMAIL: email },
          });
          
          if (usuarioExistente) {
            return res.status(400).json({ error: "Usuário com este e-mail já existe!" });
          }
          
        const novoUsuario = await prisma.USUARIOS.create({
            data: { EMAIL: email, NOME: nome, SENHA: senha },
        });

        res.status(201).json(novoUsuario);

    } catch (error){
        res
            .status(400)
            .json({error: "Erro ao criar usuário", details: error.message});
    }
});

//Página Cadastrar: Ingredientes
app.post("/INGREDIENTES", async (req, res) => {
    try{
        const { nome, preco, gramatura } = req.body;

        const novoIngrediente = await prisma.iNGREDIENTES.create({
            data: { NOME: nome, PRECO_UNITARIO: preco, GRAMATURA_UNITARIA: gramatura },
        });

        res.status(201).json(novoIngrediente);
    } catch (error) {
        res
            .status(400)
            .json({error: "Erro ao criar ingrediente", details: error.message});
    }
});

// Obter todos os ingredientes
app.get("/INGREDIENTES", async (req, res) => {
    try {
        const ingredientes = await prisma.INGREDIENTES.findMany();
        res.status(200).json(ingredientes);
    } catch (error) {
        res.status(400).json({ error: "Erro ao obter ingredientes", details: error.message });
    }
});

// Atualizar um ingrediente
app.put("/INGREDIENTES/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, gramatura } = req.body;

        const ingredienteAtualizado = await prisma.INGREDIENTES.update({
            where: { id: Number(id) },
            data: { NOME: nome, PRECO_UNITARIO: preco, GRAMATURA_UNITARIA: gramatura },
        });

        res.status(200).json(ingredienteAtualizado);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar ingrediente", details: error.message });
    }
});

// Deletar um ingrediente
app.delete("/INGREDIENTES/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.INGREDIENTES.delete({
            where: { id: Number(id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar ingrediente", details: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);