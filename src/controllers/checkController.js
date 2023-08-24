// controllers/checkController.js

const Check = require('../models/Check');
const Group = require('../models/Group.js');
const User = require('../models/User.js');

const getAllChecks = async (req, res) => {
	try {
		const checks = await Check.find();

		const user = await User.find();

		let filteredUser = user.filter((e) => {
			return e._id !== null;
		});

		// let posRefIds = filteredUser.filter((e) => e._id.toString() === checkId);

		res.json(checks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createCheck = async (req, res) => {
	try {
		const { gr_ref_id, user_ref_id, not_in_class } = req.body;
		const check = new Check({ gr_ref_id, user_ref_id, not_in_class });
		await check.save();
		res.json(check);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const getCheckById = async (req, res) => {
	try {
		const checkId = req.params.id;
		const check = await Check.findById(checkId);
		if (!check) {
			return res.status(404).json({ error: 'Check not found' });
		}
		res.json(check);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const updateCheck = async (req, res) => {
	try {
		const checkId = req.params.id;
		const { gr_ref_id, user_ref_id, not_in_class } = req.body;
		const updatedCheck = await Check.findByIdAndUpdate(
			checkId,
			{ gr_ref_id, user_ref_id, not_in_class },
			{ new: true }
		);
		if (!updatedCheck) {
			return res.status(404).json({ error: 'Check not found' });
		}
		res.json(updatedCheck);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const deleteCheck = async (req, res) => {
	try {
		const checkId = req.params.id;
		const deletedCheck = await Check.findByIdAndRemove(checkId);
		if (!deletedCheck) {
			return res.status(404).json({ error: 'Check not found' });
		}
		res.json({ message: 'Check deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

module.exports = {
	getAllChecks,
	createCheck,
	getCheckById,
	updateCheck,
	deleteCheck,
};
