const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
	user_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	reason: { type: String, required: true },
	amount: { type: Number, required: true },
	inc_time: { type: Date, default: Date.now() },
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
