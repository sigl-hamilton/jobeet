const express = require('express');

const UserCtrl = require('../controllers/user_controller');

const router = express.Router();

router.get('/:id', UserCtrl.getUserById);

module.exports = router;
