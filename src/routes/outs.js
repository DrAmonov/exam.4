// routes/outlays.js

const express = require('express');
const router = express.Router();
const outlaysController = require('../controllers/outController.js');

router.get('/', outlaysController.getAllOutlays);
router.post('/', outlaysController.createOutlay);
router.get('/:id', outlaysController.getOutlayById);
router.get('/year/:year', outlaysController.getOutlayByYear);
router.put('/:id', outlaysController.updateOutlay);
router.delete('/:id', outlaysController.deleteOutlay);

module.exports = router;
