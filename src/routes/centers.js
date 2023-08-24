// routes/centers.js

const express = require('express');
const router = express.Router();
const centersController = require('../controllers/centerController.js');

router.get('/', centersController.getAllCenters);
router.post('/', centersController.createCenter);
router.get('/:id', centersController.getCenterById);
router.put('/:id', centersController.updateCenter);
router.delete('/:id', centersController.deleteCenter);

module.exports = router;
