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

//
app.post("/INGREDIENTES", async (req, res) => {
  const {ID_USUARIO} = req.body

  try {
      const ingredientes = await prisma.INGREDIENTES.findMany({
        where: {ID_USUARIO: String(ID_USUARIO)},
        orderBy: {ID: 'asc'},
      })
      res.status(200).json(ingredientes);
  } catch (error) {
      res.status(500).json({ error: "Erro ao buscar ingredientes", details: error.message });
  }
});

app.post("/INGREDIENTES/criar", async (req, res) => {
  try{
      const { nome, preco, gramatura, ID_USUARIO } = req.body;
        
      const novoIngrediente = await prisma.INGREDIENTES.create({
          data: { NOME: nome, PRECO_UNITARIO: preco, GRAMATURA_UNITARIA: gramatura, ID_USUARIO: ID_USUARIO },
      });

      res.status(201).json(novoIngrediente);

  } catch (error){
      res
          .status(400)
          .json({error: "Erro ao criar ingrediente", details: error.message});
  }
});

app.put("/INGREDIENTES/:ID", async (req, res) => {
  try {
      const { ID } = req.params;

      const idNumber = parseInt(ID, 10);

      if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID inválido" });
      }

      const { NOME, PRECO_UNITARIO, GRAMATURA_UNITARIA } = req.body;

      if (!NOME || isNaN(PRECO_UNITARIO) || isNaN(GRAMATURA_UNITARIA)) {
        return res.status(400).json({ error: "Dados inválidos. Verifique os campos enviados." });
      }      

      const ingredienteExiste = await prisma.INGREDIENTES.findUnique({
        where: { ID: Number(ID) },
      });

      if(!ingredienteExiste){
        return res.status(404).json({error: "Ingrediente não encontrado"});
      }

      const ingredienteAtualizado = await prisma.INGREDIENTES.update({
          where: { ID: Number(ID) },
          data: { NOME, PRECO_UNITARIO, GRAMATURA_UNITARIA },
      });

      res.json(ingredienteAtualizado);

  } catch (error) {
      res.status(400).json({ error: "Erro ao atualizar ingrediente", details: error.message });
  }
});

app.delete("/INGREDIENTES/:ID", async (req, res) => {
  try {
      const { ID } = req.params;

      const idNumber = parseInt(ID, 10);

      if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID inválido" });
      }

      const ingredienteExiste = await prisma.INGREDIENTES.findUnique({
        where: { ID: parseInt(ID) },
      });

      if(!ingredienteExiste){
        return res.status(404).json({error: "Ingrediente não encontrado"});
      }

      await prisma.INGREDIENTES_RECEITA.deleteMany({
            where: { ID_INGREDIENTE: parseInt(ID) },
      });

      await prisma.INGREDIENTES.delete({
          where: { ID: parseInt(ID) },
      });

      res.status(204).send();

  } catch (error) {
      res.status(500).json({ error: "Erro ao deletar ingrediente", details: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
