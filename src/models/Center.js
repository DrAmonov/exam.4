const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	address: { type: String, required: true },
	open_date: { type: String },
	close_date: { type: String },
});

const Center = mongoose.model('Center', centerSchema);

module.exports = Center;
