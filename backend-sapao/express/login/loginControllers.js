const prisma = require('../prismaClient.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'S4p40N4C0z1nh4';

exports.loginUsuario = async (req, res) => {
    const { EMAIL, SENHA } = req.body;

    try {
        const usuario = await prisma.USUARIOS.findUnique({
            where: {EMAIL},
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        if (usuario.SENHA !== SENHA) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = jwt.sign({ EMAIL: usuario.EMAIL }, SECRET_KEY, { expiresIn: '3h' }); 

        res.status(200).json({
            message: 'Login realizado com sucesso.',
            EMAIL: usuario.EMAIL,
            NOME: usuario.NOME,
            token,
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};

exports.getMeuUsuario = async (req, res) => {
    try {
        const usuario = await prisma.USUARIOS.findUnique({
            where: { EMAIL: req.usuario.EMAIL },
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({
            NOME: usuario.NOME,
            EMAIL: usuario.EMAIL,
        });
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar informações do usuário.' });
    }
};