const express = require('express');
const ProfileController = require('../controllers').Profiles;

const router = express.Router();

// api/profiles
router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
