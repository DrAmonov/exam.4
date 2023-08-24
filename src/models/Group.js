const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	dir_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Direction',
	},
	gr_number: { type: Number, required: true },
	begin_date: { type: Date, default: new Date() },
	end_date: Date,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
