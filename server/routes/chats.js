const express = require('express');
const ChatController = require('../controllers').Chats

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    if (req.query.userId && req.query.matchUserId) {
      ChatController.getAllForUserMatch(req, res);
    } else if (req.query.userId) {
      ChatController.getAllForUser(req, res);
    } else {
      ChatController.getAll(req, res);
    }
  })
  .post(ChatController.create);

module.exports = router;
