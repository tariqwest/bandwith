const express = require('express');
const LocationController = require('../controllers').Location;

const router = express.Router();

router.route('/:id')
  .get(LocationController.getOne);

module.exports = router;
