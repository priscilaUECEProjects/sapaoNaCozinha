const express = require("express");
const { PrismaClient } = require("@prisma/client");
const loginRoutes = require('./express/login/loginRoutes.js');
const receitasRoutes = require('./express/receitas/receitasRoutes.js');

const app = express();
const prisma = new PrismaClient();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use('/login', loginRoutes);

app.use('/receitas', receitasRoutes);

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

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
