const express = require('express');

const CandidateCtrl = require('../controllers/candidate_controller');

const router = express.Router();

router.get('/list', CandidateCtrl.getCandidates);

module.exports = router;
