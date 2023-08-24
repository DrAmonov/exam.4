// controllers/directionController.js

const { populate } = require('../models/Department');
const Direction = require('../models/Direction');
const Group = require('../models/Group.js');
const mongoose = require('mongoose');

const getAllDirections = async (req, res) => {
	try {
		const directions = await Direction.find();
		res.json(directions);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const createDirection = async (req, res) => {
	try {
		const { dep_ref_id, dir_name, duration, salary } = req.body;
		const direction = new Direction({
			dep_ref_id,
			dir_name,
			duration,
			salary,
		});
		await direction.save();
		res.json(direction);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getDirectionById = async (req, res) => {
	try {
		const directionId = req.params.id;
		const direction = await Direction.findById(directionId);
		if (!direction) {
			return res.status(404).json({ error: 'Direction not found' });
		}

		const group = await Group.find();

		let filteredGroup = group.filter((e) => {
			return e.dir_ref_id !== null;
		});

		let dirRefIds = filteredGroup.filter(
			(e) => e.dir_ref_id.toString() === directionId
		);

		// console.log(dirRefIds);

		res.json({ direction, group: dirRefIds });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getByName = async (req, res) => {
	try {
		const name = req.params.name;
		const direction = await Direction.find({ dir_name: name });

		if (!direction) {
			res.status(404).json({ error: 'Direction not found' });
		}

		res.status(200).json({ message: direction });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateDirection = async (req, res) => {
	try {
		const directionId = req.params.id;
		const { dep_ref_id, dir_name, duration, salary } = req.body;
		const updatedDirection = await Direction.findByIdAndUpdate(
			directionId,
			{ dep_ref_id, dir_name, duration, salary },
			{ new: true }
		);
		if (!updatedDirection) {
			return res.status(404).json({ error: 'Direction not found' });
		}
		res.json(updatedDirection);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const deleteDirection = async (req, res) => {
	try {
		const directionId = req.params.id;
		const deletedDirection = await Direction.findByIdAndRemove(directionId);
		if (!deletedDirection) {
			return res.status(404).json({ error: 'Direction not found' });
		}
		res.json({ message: 'Direction deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

module.exports = {
	getAllDirections,
	createDirection,
	getDirectionById,
	updateDirection,
	deleteDirection,
	getByName,
};
