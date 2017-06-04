const express = require('express');
const SearchController = require('../controllers').Search;

const router = express.Router();

router.route('/')
  .get(SearchController.search);

module.exports = router;
