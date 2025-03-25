const prisma = require('../prismaClient.js');

exports.getReceitasFromUser  = async (req, res) => {
    const {ID_USUARIO} = req.body;

    try{
        const receitas = await prisma.RECEITAS.findMany({
            where: {ID_USUARIO: String(ID_USUARIO)},
            include: {
                Ingredientes_receita: {
                    select: {
                        PROPORCAO_INGREDIENTE: true,
                        ID_IR: true,
                        Ingredientes: {
                            select: {
                                ID: true,
                                NOME: true,
                                PRECO_UNITARIO: true,
                                GRAMATURA_UNITARIA: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                ID: 'asc',
            },
        });

        if(receitas){
            res.status(200).json(receitas);
          } else {
            res.status(404).json({ message: 'Receitas do usuario não encontradas' });
          }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as receitas do usuario' });
    }
};

exports.deleteReceitaFromUser = async (req, res) => {
    const { ID } = req.params;

    try {
        await prisma.INGREDIENTES_RECEITA.deleteMany({
            where: { ID_RECEITA: parseInt(ID) },
        });

        await prisma.RECEITAS.delete({
            where: { ID: parseInt(ID) },
        });

        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar receita ou ingredientes:", error);
        res.status(500).json({ error: 'Erro ao deletar a receita ou seus ingredientes' });
    }
};

exports.UpdateReceita = async (req, res) => {
    const { ID } = req.params;
    const { NOME, QNT_PADRAO, Ingredientes_receita } = req.body;

    try {
        for (const ingrediente of Ingredientes_receita) {
            if (ingrediente.ID_IR) {
                await prisma.INGREDIENTES_RECEITA.update({
                    where: { ID_IR: ingrediente.ID_IR },
                    data: {
                        PROPORCAO_INGREDIENTE: ingrediente.PROPORCAO_INGREDIENTE,
                    },
                });
            } else {
                await prisma.INGREDIENTES_RECEITA.create({
                    data: {
                        ID_RECEITA: parseInt(ID),
                        ID_INGREDIENTE: ingrediente.ID_INGREDIENTE,
                        PROPORCAO_INGREDIENTE: ingrediente.PROPORCAO_INGREDIENTE,
                    },
                });
            }
        }

        const receitaAtualizada = await prisma.RECEITAS.update({
            where: { ID: parseInt(ID) },
            data: {
                NOME,
                QNT_PADRAO,
            },
            include: {
                Ingredientes_receita: true,
            },
        });

        res.status(200).json(receitaAtualizada);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao atualizar a receita ou seus ingredientes', error});
    }
};

exports.DeleteIngredienteFromReceita = async (req, res) => {
    const { ID_IR } = req.params;

    try {
        await prisma.INGREDIENTES_RECEITA.delete({
            where: { ID_IR: parseInt(ID_IR) },
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar ingrediente:", error);
        res.status(500).json({ error: 'Erro ao deletar ingrediente' });
    }
};

exports.getIngredientesDisponiveis = async (req,res) => {
    const {ID_USUARIO} = req.body

    try{
        const ingredientes = await prisma.INGREDIENTES.findMany({
            where: {ID_USUARIO: String(ID_USUARIO)}
    })
    if(ingredientes){
        res.status(200).json(ingredientes);
      } else {
        res.status(404).json({ message: 'Ingredientes do usuario não encontradas' });
      }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os ingredientes do usuario' });
    }
};

exports.createReceitaComIngrediente = async (req, res) => {
    const { NOME, QNT_PADRAO, ID_USUARIO, Ingredientes_receita } = req.body;

    try {
        const novaReceita = await prisma.RECEITAS.create({
            data: {
                NOME,
                QNT_PADRAO,
                ID_USUARIO,
                Ingredientes_receita: {
                    create: Ingredientes_receita,
                },
            },
            include: {
                Ingredientes_receita: true,
            },
        });
        res.status(201).json(novaReceita);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar a receita com ingredientes'});
    }
};
