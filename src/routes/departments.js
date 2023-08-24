// routes/departments.js

const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentController.js');

router.get('/', departmentsController.getAllDepartments);
router.post('/', departmentsController.createDepartment);
router.get('/:id', departmentsController.getDepartmentById);
router.put('/:id', departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;
