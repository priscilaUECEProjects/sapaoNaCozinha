const jwt = require('jsonwebtoken');
const SECRET_KEY = 'S4p40N4C0z1nh4';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};

module.exports = authenticate;