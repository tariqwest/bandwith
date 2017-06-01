const express = require('express');
const PreferenceController = require('../controllers').Preference;

const router = express.Router();

router.route('/')
  .post(PreferenceController.update);

module.exports = router;
