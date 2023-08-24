const mongoose = require('mongoose');

const outlaySchema = new mongoose.Schema({
	reason: { type: String, required: true },
	amount: { type: Number, required: true },
	out_time: { type: Date, default: Date.now() },
});

const Outlay = mongoose.model('Outlay', outlaySchema);

module.exports = Outlay;
