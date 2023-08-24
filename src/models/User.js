const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	pos_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Position',
	},
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	gender: { type: Number, required: true },
	contact: { type: String, required: true, unique: true },
	email: { type: String, required: true },
	come_date: { type: Date, default: Date.now },
	left_date: Date,
	group_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
		required: false,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
