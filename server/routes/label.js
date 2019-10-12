const express = require('express');
const LabelCtrl = require('../controllers/label_controller');

const router = express.Router();

router.post('/', LabelCtrl.createLabel);
router.get('/list', LabelCtrl.getLabels); // Lui il faut le mettre au dessus sinon ça proc ce d'en dessous en premier
router.get('/:id', LabelCtrl.getLabelById);
router.put('/:id', LabelCtrl.updateLabelById);

module.exports = router;
