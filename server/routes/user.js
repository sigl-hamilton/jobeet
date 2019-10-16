const express = require('express');

const UserCtrl = require('../controllers/user_controller');

const router = express.Router();

router.get('/list', UserCtrl.getUsers);
router.get('/current', UserCtrl.getCurrentUser);
router.get('/:id', UserCtrl.getUserById);
router.put('/:id', UserCtrl.updateUserById);
module.exports = router;
