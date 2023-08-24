// routes/users.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController.js');
const checkAdmin = require('../middleware/checkAdmin.js');

router.post('/admin', usersController.loginAdmin);
router.post('/user', usersController.loginUser);
router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/name/:firstName', usersController.getUsersByName);
router.get('/contact/:contact', usersController.getUsersByContact);
router.get('/gen/:gen', usersController.getUsersByGen);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
