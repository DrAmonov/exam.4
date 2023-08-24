// controllers/outController.js

const Outlay = require('../models/Outlay');

const getAllOutlays = async (req, res) => {
	try {
		const outlays = await Outlay.find();
		res.json(outlays);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const createOutlay = async (req, res) => {
	try {
		const { reason, amount } = req.body;
		const outlay = new Outlay({ reason, amount });
		await outlay.save();
		res.json(outlay);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const getOutlayById = async (req, res) => {
	try {
		const outlayId = req.params.id;
		const outlay = await Outlay.findById(outlayId);
		if (!outlay) {
			return res.status(404).json({ error: 'Outlay not found' });
		}
		res.json(outlay);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const getOutlayByYear = async (req, res) => {
	try {
		const year = parseInt(req.params.year);
		const outlays = await Outlay.aggregate([
			{
				$match: {
					out_time: {
						$gte: new Date(`${year}-01-01T00:00:00.000Z`),
						$lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
					},
				},
			},
		]);

		if (outlays.length === 0) {
			return res
				.status(404)
				.json({ error: 'No outlays found for the specified year' });
		}

		res.json(outlays);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const updateOutlay = async (req, res) => {
	try {
		const outlayId = req.params.id;
		const { reason, amount } = req.body;
		const updatedOutlay = await Outlay.findByIdAndUpdate(
			outlayId,
			{ reason, amount },
			{ new: true }
		);
		if (!updatedOutlay) {
			return res.status(404).json({ error: 'Outlay not found' });
		}
		res.json(updatedOutlay);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const deleteOutlay = async (req, res) => {
	try {
		const outlayId = req.params.id;
		const deletedOutlay = await Outlay.findByIdAndRemove(outlayId);
		if (!deletedOutlay) {
			return res.status(404).json({ error: 'Outlay not found' });
		}
		res.json({ message: 'Outlay deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

module.exports = {
	getAllOutlays,
	createOutlay,
	getOutlayById,
	updateOutlay,
	deleteOutlay,
	getOutlayByYear,
};
