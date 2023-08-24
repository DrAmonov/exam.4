// controllers/departmentController.js

const Department = require('../models/Department');
const Direction = require('../models/Direction.js');
const Position = require('../models/Position.js');

const getAllDepartments = async (req, res) => {
	try {
		const departments = await Department.find();
		res.json(departments);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

const createDepartment = async (req, res) => {
	try {
		const { center_ref_id, dep_name } = req.body;

		const department = new Department({
			center_ref_id,
			dep_name,
		});
		await department.save();
		res.json(department);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getDepartmentById = async (req, res) => {
	try {
		const departmentId = req.params.id;
		const department = await Department.findById(departmentId);
		if (!department) {
			return res.status(404).json({ error: 'Department not found' });
		}

		// console.log(department);

		const direction = await Direction.find().populate('dep_ref_id');
		const position = await Position.find().populate('dep_ref_id');

		// console.log(direction);

		if (!direction && position) {
			return res.status(404).json({ error: 'Direction or Position not found' });
		}

		res.json({ department, direction, position });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateDepartment = async (req, res) => {
	try {
		const departmentId = req.params.id;
		const { center_ref_id, dep_name } = req.body;
		const updatedDepartment = await Department.findByIdAndUpdate(
			departmentId,
			{ center_ref_id, dep_name },
			{ new: true }
		);
		if (!updatedDepartment) {
			return res.status(404).json({ error: 'Department not found' });
		}
		res.json(updatedDepartment);
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};

const deleteDepartment = async (req, res) => {
	try {
		const departmentId = req.params.id;
		const deletedDepartment = await Department.findByIdAndRemove(departmentId);
		if (!deletedDepartment) {
			return res.status(404).json({ error: 'Department not found' });
		}
		res.json({ message: 'Department deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

module.exports = {
	getAllDepartments,
	createDepartment,
	getDepartmentById,
	updateDepartment,
	deleteDepartment,
};
