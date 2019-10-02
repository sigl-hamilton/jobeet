const express = require('express');

const UserCtrl = require('../controllers/user_controller');

const router = express.Router();

router.get('/list', UserCtrl.getRecruiters);
router.get('/:id', UserCtrl.getRecruiterById);

module.exports = router;
