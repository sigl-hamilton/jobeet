const express = require('express');

const ChatCtrl = require('../controllers/chat_controller');

const router = express.Router();

router.post('/', ChatCtrl.createChat);
router.post('/job', ChatCtrl.getChatByJob);
router.get('/:id', ChatCtrl.getChatById);
router.put('/:id', ChatCtrl.addMessage);

module.exports = router;
