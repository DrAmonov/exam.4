// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const loginAdmin = async (req, res, next) => {
	const { pos_ref_id, first_name, last_name, gender, contact, email } =
		req.body;

	try {
		const admin = await User.findOne();

		if (admin.last_name != last_name)
			res.status(404).send({ message: 'smth wrong' });

		const isMatch = (await admin.contact) === contact;
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const payload = {
			user: {
				id: admin._id,
				role: admin.pos_ref_id,
			},
		};

		jwt.sign(payload, 'JWT_SECRET', { expiresIn: '1h' }, (error, token) => {
			if (error) throw error;
			res.json({ token });
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const loginUser = async (req, res, next) => {
	const { first_name, last_name, contact } = req.body;

	try {
		const user = await User.findOne({
			first_name: first_name,
			last_name: last_name,
		});

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isMatch = user.contact === contact;
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const payload = {
			user: {
				id: user._id,
				role: user.pos_ref_id,
			},
		};

		jwt.sign(payload, 'JWT_SECRET', { expiresIn: '1h' }, (error, token) => {
			if (error) {
				return res.status(500).json({ error: 'Error generating token' });
			}
			res.json({ token });
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createUser = async (req, res) => {
	const {
		pos_ref_id,
		first_name,
		last_name,
		gender,
		contact,
		email,
		group_ref_id,
	} = req.body;

	try {
		// const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = new User({
			pos_ref_id,
			first_name,
			last_name,
			gender,
			contact,
			email,
			group_ref_id,
		});
		await newUser.save();

		// const token = await jwt.sign(newUser._id, 'akjlfbcakbe');

		res.json({ message: 'User created successfully', user: newUser });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	const { userId } = req.params;
	const {
		pos_ref_id,
		first_name,
		last_name,
		gender,
		contact,
		email,
		group_ref_id,
	} = req.body;

	try {
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				pos_ref_id,
				first_name,
				last_name,
				gender,
				contact,
				email,
				group_ref_id,
			},
			{ new: true }
		);
		res.json({
			message: 'User updated successfully',
			// user: updatedUser
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: 'An error occurred while updating the user' });
	}
};

const deleteUser = async (req, res) => {
	const { userId } = req.params;

	try {
		await User.findByIdAndDelete(userId);
		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		res
			.status(500)
			.json({ error: 'An error occurred while deleting the user' });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUsersByName = async (req, res) => {
	try {
		const firstName = req.params.firstName;
		const group = await User.findOne({ first_name: firstName });

		if (!group) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json({ group });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUsersByContact = async (req, res) => {
	try {
		const contact = req.params.contact;
		const user = await User.findOne({ contact: contact });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json({ user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUsersByGen = async (req, res) => {
	try {
		const gen = req.params.gen;
		const user = await User.find({ gender: gen });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json({ user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	loginAdmin,
	loginUser,
	createUser,
	updateUser,
	deleteUser,
	getAllUsers,
	getUsersByName,
	getUsersByContact,
	getUsersByGen,
};
