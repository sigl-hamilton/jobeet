const express = require('express');

const UserCtrl = require('../controllers/user_controller');

const router = express.Router();

router.get('/list', UserCtrl.getCandidates);
router.get('/:id', UserCtrl.getCandidateById);

module.exports = router;
