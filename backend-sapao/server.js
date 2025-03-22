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

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);