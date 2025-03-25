const express = require('express');
const router = express.Router();
const receitasControllers = require('./receitasControllers.js');

router.post('/', receitasControllers.getReceitasFromUser);

router.delete('/:ID', receitasControllers.deleteReceitaFromUser);

router.put('/:ID', receitasControllers.UpdateReceita);

router.delete('/ingrediente/:ID_IR', receitasControllers.DeleteIngredienteFromReceita);

router.post('/opcoes', receitasControllers.getIngredientesDisponiveis);

router.post('/criar', receitasControllers.createReceitaComIngrediente);

module.exports = router;
