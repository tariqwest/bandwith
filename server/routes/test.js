const express = require('express');

const router = express.Router();

router.route('/')
  .post((req, res) => {
    debugger;
    console.log('post request received from test: ', req.body);
    // post the username into the database
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;
