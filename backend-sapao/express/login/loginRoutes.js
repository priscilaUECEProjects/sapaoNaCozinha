const express = require('express');
const router = express.Router();
const authenticate = require('./Authorization.js');
const loginControllers = require('./loginControllers.js');

router.get('/me', authenticate, loginControllers.getMeuUsuario);

router.post('/', loginControllers.loginUsuario);

router.get('/protegido', authenticate, (req, res) => {
    res.json({ message: `Bem-vindo ao endpoint protegido, ${req.usuario.EMAIL}` });
});

module.exports = router;