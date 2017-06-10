const express = require('express');
const InfluenceController = require('../controllers').Influence;

const router = express.Router();

router.route('/')
  .post(InfluenceController.saveOne);

module.exports = router;
