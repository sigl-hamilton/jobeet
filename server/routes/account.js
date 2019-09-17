const express = require('express');

const AccountCtrl = require('../controllers/user_controller');

const router = express.Router();

router.post('/register', AccountCtrl.signUp);
router.post('/login', AccountCtrl.logIn);

module.exports = router;
