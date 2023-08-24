// routes/positions.js

const express = require('express');
const router = express.Router();
const positionsController = require('../controllers/positionController.js');

router.get('/', positionsController.getAllPositions);
router.post('/', positionsController.createPosition);
router.get('/:id', positionsController.getPositionById);
router.get('/name/:name', positionsController.getByName);
router.put('/:id', positionsController.updatePosition);
router.delete('/:id', positionsController.deletePosition);

module.exports = router;
