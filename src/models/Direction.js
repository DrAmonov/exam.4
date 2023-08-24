const mongoose = require('mongoose');

const directionSchema = new mongoose.Schema({
	dep_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Department',
	},
	dir_name: { type: String, required: true },
	duration: { type: Number, required: true },
	salary: { type: Number, required: true },
	start_date: { type: Date, default: new Date() },
	end_date: { type: Date },
});

const Direction = mongoose.model('Direction', directionSchema);

module.exports = Direction;
