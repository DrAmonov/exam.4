// routes/incomes.js

const express = require('express');
const router = express.Router();
const incomesController = require('../controllers/incomeController.js');

router.get('/', incomesController.getAllIncomes);
router.post('/', incomesController.createIncome);
router.get('/:id', incomesController.getIncomeById);
router.get('/month/:year/:month', incomesController.getIncomeByMonth);
router.put('/:id', incomesController.updateIncome);
router.delete('/:id', incomesController.deleteIncome);

module.exports = router;
