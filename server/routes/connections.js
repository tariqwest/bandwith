const express = require('express');
const ConnectionsController = require('../controllers').Connections;

const router = express.Router();

router.route('/')
  .post(ConnectionsController.update);

module.exports = router;
