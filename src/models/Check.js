const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
	gr_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Group',
	},
	user_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	not_in_class: [String],
	add_date: { type: Date, default: Date.now() },
});

const Check = mongoose.model('Check', checkSchema);

module.exports = Check;
