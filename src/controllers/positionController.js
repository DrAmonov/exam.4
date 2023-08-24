// controllers/positionController.js

const Position = require('../models/Position');
const User = require('../models/User.js');

const getAllPositions = async (req, res) => {
	try {
		const positions = await Position.find();
		res.json(positions);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const createPosition = async (req, res) => {
	try {
		const { dep_ref_id, pos_name, salary } = req.body;
		const position = new Position({ dep_ref_id, pos_name, salary });
		await position.save();
		res.json(position);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const getPositionById = async (req, res) => {
	try {
		const positionId = req.params.id;
		const position = await Position.findById(positionId);
		if (!position) {
			return res.status(404).json({ error: 'Position not found' });
		}

		const user = await User.find();

		let filteredUser = user.filter((e) => {
			return e.pos_ref_id !== null;
		});

		let posRefIds = filteredUser.filter(
			(e) => e.pos_ref_id.toString() === positionId
		);

		console.log(posRefIds);

		res.json({ position, user: posRefIds });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getByName = async (req, res) => {
	try {
		const name = req.params.name;
		const psoName = await Position.find({ pos_name: name });

		if (!psoName) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json({ psoName });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updatePosition = async (req, res) => {
	try {
		const positionId = req.params.id;
		const { dep_ref_id, pos_name, salary } = req.body;
		const updatedPosition = await Position.findByIdAndUpdate(
			positionId,
			{ dep_ref_id, pos_name, salary },
			{ new: true }
		);
		if (!updatedPosition) {
			return res.status(404).json({ error: 'Position not found' });
		}
		res.json(updatedPosition);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const deletePosition = async (req, res) => {
	try {
		const positionId = req.params.id;
		const deletedPosition = await Position.findByIdAndRemove(positionId);
		if (!deletedPosition) {
			return res.status(404).json({ error: 'Position not found' });
		}
		res.json({ message: 'Position deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

module.exports = {
	getAllPositions,
	createPosition,
	getPositionById,
	updatePosition,
	deletePosition,
	getByName,
};
