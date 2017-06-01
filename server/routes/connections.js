const express = require('express');
const ConnectionsController = require('../controllers').Connections;

const router = express.Router();

router.route('/')
  .get(ConnectionsController.getAll);

module.exports = router;
