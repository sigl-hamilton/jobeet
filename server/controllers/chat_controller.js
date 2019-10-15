const ChatSchema = require('../models/chat_model');
const MessageSchema = require('../models/message_model');

createChat = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({success: false, error: 'You must provide the elements for the chat'});
    }
    const chat = new ChatSchema(body);

    if (!chat) {
        return res.status(400).json({ success: false, error: req.error });
    }

    chat.save()
        .then(() => {
            return res.status(201).json({success: true, id: chat._id, message: 'Chat created!'})
        }).catch(error => {
            return res.status(400).json({error, message: 'Chat not created!'})
        })
};

addMessage = async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({success: false, error: 'You must provide the elements for the chat'});
    }
    const mess = new MessageSchema(body);
    mess.save();

    ChatSchema.findOne({_id: req.params.id}).populate('messages').exec( (err, chat) => {
        if (err) {
            return res.status(404).json({ err, message: 'Chat not found!' });
        }
        chat.messages.push({_id: mess._id});
        chat.save().then( () => {
                return res.status(200).json({success: true, chat: chat, message: 'Message added!'})
            }).catch(error => {
            return res.status(404).json({ error, message: 'Message not added!'})
        });

    });
};

deleteChat = async (req, res) => {
  await ChatSchema.findOneAndDelete({ _id: req.params.id }, (err, chat) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!chat) {
          return res.status(404).json({ success: false, error: `Chat not found` })
      }

      return res.status(200).json({ success: true, data: chat })
  }).catch(err => console.log(err))
};

getChatById = async (req, res) => {
    await ChatSchema.findOne({ id: req.params.id }).populate('messages').exec( (err, chat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!chat) {
            return res
                .status(404)
                .json({ success: false, error: `Chat not found` })
        }
        return res.status(200).json({ success: true, data: chat })
    })
};

getChatByJob = async (req, res) => {
    const job = req.body.job;
    const userFrom = req.body.userFrom;
    const userTo = req.body.userTo;

    await ChatSchema.findOne({ job: job, userFrom: userFrom, userTo: userTo })
        .populate('messages').exec((err, chat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!chat) {
            ChatSchema.findOne({ job: job, userFrom: userTo, userTo: userFrom })
                .populate('messages').exec((err, chat) => {
                return res.status(200).json({ success: true, data: chat });
            });
            return res.status(404).json({ success: false, error: `Chat not found` });
        }
        return res.status(200).json({ success: true, data: chat });
    })
};

module.exports = {
    createChat,
    addMessage,
    getChatById,
    getChatByJob,
};
