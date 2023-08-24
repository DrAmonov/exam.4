const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
	dep_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Department',
	},
	pos_name: { type: String, required: true },
	salary: Number,
	delete_at: Number,
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
