const express = require('express');
const LocationController = require('../controllers').Location;

const router = express.Router();

router.route('/:zipcode')
  .get(LocationController.getOne);

module.exports = router;
