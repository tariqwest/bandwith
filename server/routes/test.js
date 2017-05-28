const express = require('express');
const TestController = require('../controllers').Test;

const router = express.Router();

router.route('/')
  .post(TestController.create);

module.exports = router;
