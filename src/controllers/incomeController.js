// controllers/incomeController.js

const Income = require('../models/Income');

const getAllIncomes = async (req, res) => {
	try {
		const incomes = await Income.find();
		res.json(incomes);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const createIncome = async (req, res) => {
	try {
		const { user_ref_id, reason, amount } = req.body;
		const income = new Income({ user_ref_id, reason, amount });
		await income.save();
		res.json(income);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const getIncomeById = async (req, res) => {
	try {
		const incomeId = req.params.id;
		const income = await Income.findById(incomeId);
		if (!income) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json(income);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const getIncomeByMonth = async (req, res) => {
	try {
		const year = parseInt(req.params.year);
		const month = parseInt(req.params.month);

		if (isNaN(year) || isNaN(month)) {
			return res.status(400).json({ error: 'Invalid year or month' });
		}

		const startOfMonth = new Date(year, month - 1, 1);
		const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

		const income = await Income.find({
			inc_time: { $gte: startOfMonth, $lte: endOfMonth },
		});

		res.json(income);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const updateIncome = async (req, res) => {
	try {
		const incomeId = req.params.id;
		const { user_ref_id, reason, amount } = req.body;
		const updatedIncome = await Income.findByIdAndUpdate(
			incomeId,
			{ user_ref_id, reason, amount },
			{ new: true }
		);
		if (!updatedIncome) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json(updatedIncome);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const deleteIncome = async (req, res) => {
	try {
		const incomeId = req.params.id;
		const deletedIncome = await Income.findByIdAndRemove(incomeId);
		if (!deletedIncome) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json({ message: 'Income deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

module.exports = {
	getAllIncomes,
	createIncome,
	getIncomeById,
	updateIncome,
	deleteIncome,
	getIncomeByMonth,
};
