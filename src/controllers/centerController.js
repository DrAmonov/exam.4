// controllers/centerController.js

const Center = require('../models/Center');

const getAllCenters = async (req, res) => {
	try {
		const centers = await Center.find();
		res.json(centers);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const createCenter = async (req, res) => {
	try {
		const { name, address } = req.body;

		const openDate = '24 / 7';
		const closeDate = '24 / 7';

		// console.log(openDate, closeDate);
		const center = new Center({ name, address, openDate, closeDate });
		await center.save();
		res.json(center);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getCenterById = async (req, res) => {
	try {
		const centerId = req.params.id;
		const center = await Center.findById(centerId);
		if (!center) {
			return res.status(404).json({ error: 'Center not found' });
		}
		res.json(center);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateCenter = async (req, res) => {
	try {
		const centerId = req.params.id;
		const { name, address, openDate, closeDate } = req.body;
		const updatedCenter = await Center.findByIdAndUpdate(
			centerId,
			{ name, address, openDate, closeDate },
			{ new: true }
		);
		if (!updatedCenter) {
			return res.status(404).json({ error: 'Center not found' });
		}
		res.json(updatedCenter);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteCenter = async (req, res) => {
	try {
		const centerId = req.params.id;
		const deletedCenter = await Center.findByIdAndRemove(centerId);
		if (!deletedCenter) {
			return res.status(404).json({ error: 'Center not found' });
		}
		res.json({ message: 'Center deleted successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getAllCenters,
	createCenter,
	getCenterById,
	updateCenter,
	deleteCenter,
};
