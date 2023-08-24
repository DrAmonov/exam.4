// routes/directions.js

const express = require('express');
const router = express.Router();
const directionsController = require('../controllers/directionController.js');

router.get('/', directionsController.getAllDirections);
router.post('/', directionsController.createDirection);
router.get('/:id', directionsController.getDirectionById);
router.get('/name/:name', directionsController.getByName);
router.put('/:id', directionsController.updateDirection);
router.delete('/:id', directionsController.deleteDirection);

module.exports = router;
