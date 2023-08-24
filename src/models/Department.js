const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
	center_ref_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Center',
	},
	dep_name: { type: String, required: true },
	create_at: { type: Date, default: Date.now },
	delete_at: Date,
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
