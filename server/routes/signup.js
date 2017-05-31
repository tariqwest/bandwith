const express = require('express');
const SignupController = require('../controllers').Signup;

const router = express.Router();

router.route('/')
  .post(SignupController.create);

module.exports = router;
