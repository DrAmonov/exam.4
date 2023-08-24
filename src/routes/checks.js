// routes/checks.js

const express = require('express');
const router = express.Router();
const checksController = require('../controllers/checkController.js');

router.get('/', checksController.getAllChecks);
router.post('/', checksController.createCheck);
router.get('/:id', checksController.getCheckById);
router.put('/:id', checksController.updateCheck);
router.delete('/:id', checksController.deleteCheck);

module.exports = router;
