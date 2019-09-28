const express = require('express');

const UserCtrl = require('../controllers/user_controller');

const router = express.Router();

router.get('/:id', UserCtrl.getUserById);
//router.post('/register', UserCtrl.register);
//router.post('/login', UserCtrl.logIn);
//router.get('/user', UserCtrl.getCurrentUser);
module.exports = router;
