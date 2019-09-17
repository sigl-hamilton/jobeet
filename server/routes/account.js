const express = require('express');

const AccountCtrl = require('../controllers/account_controller');

const router = express.Router();

router.post('/register', AccountCtrl.signUp);
router.post('/login', AccountCtrl.logIn);

module.exports = router;
