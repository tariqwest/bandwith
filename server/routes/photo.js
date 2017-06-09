const express = require('express');
const PhotoController = require('../controllers').Photo;

const router = express.Router();

router.route('/')
  .post(PhotoController.update);

module.exports = router;
