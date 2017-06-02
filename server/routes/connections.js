const express = require('express');
const ConnectionsController = require('../controllers').Connections;

const router = express.Router();

router.route('/')
  .get(ConnectionsController.getAll);

router.route('/info')
  .get(ConnectionsController.getOneWithRelations);

module.exports = router;
