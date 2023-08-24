// controllers/groupController.js

const Group = require('../models/Group');
const User = require('../models/User.js');

const getAllGroups = async (req, res) => {
	try {
		const groups = await Group.find();
		res.json(groups);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const createGroup = async (req, res) => {
	try {
		const { dir_ref_id, gr_number } = req.body;
		const group = new Group({ dir_ref_id, gr_number });
		await group.save();
		res.json(group);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const getGroupById = async (req, res) => {
	try {
		const groupId = req.params.id;
		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(404).json({ error: 'Group not found' });
		}

		const users = await User.find();

		const filteredUsers = users.filter((user) => {
			return user.group_ref_id && user.group_ref_id.toString() === groupId;
		});

		res.json({ group, users: filteredUsers });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getGroupByName = async (req, res) => {
	try {
		const groupName = req.params.name;
		const group = await Group.findOne(first_name);
		if (!group) {
			return res.status(404).json({ error: 'Group not found' });
		}

		res.json(group);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateGroup = async (req, res) => {
	try {
		const groupId = req.params.id;
		const { dir_ref_id, gr_number } = req.body;
		const updatedGroup = await Group.findByIdAndUpdate(
			groupId,
			{ dir_ref_id, gr_number },
			{ new: true }
		);
		if (!updatedGroup) {
			return res.status(404).json({ error: 'Group not found' });
		}
		res.json(updatedGroup);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const deleteGroup = async (req, res) => {
	try {
		const groupId = req.params.id;
		const deletedGroup = await Group.findByIdAndRemove(groupId);
		if (!deletedGroup) {
			return res.status(404).json({ error: 'Group not found' });
		}
		res.json({ message: 'Group deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

module.exports = {
	getAllGroups,
	createGroup,
	getGroupById,
	updateGroup,
	deleteGroup,
};
