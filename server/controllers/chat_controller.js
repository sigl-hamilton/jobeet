const Job = require('../models/job_model')
const ChatSchema = require('../models/chat_model')
const MessageSchema = require('../models/message_model')

createChat = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide the elements for the chat',
        })
    }

    const chat = new ChatSchema(body)

    if (!chat) {
        return res.status(400).json({ success: false, error: err })
    }

    chat
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: job._id,
                message: 'Chat created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Chat not created!',
            })
        })
}

addMessage = async (req, res) => {
  const body = req.body
  if (!body) {
    return
  }
  ChatSchema.findOne({_id: req.params.id}, (err, chat) => {
    if (err) {
      return res.status(404).json({
          err,
          message: 'Chat not found!',
      })
    }
    chat.messages.push(body)
    chat
      .save()
      .then(() => {
        return res.status(200).json({
            success: true,
            id: job._id,
            message: 'Message added!',
        })
      })
      .catch(error => {
          return res.status(404).json({
              error,
              message: 'Message not added!',
          })
      })
  })
}

deleteChat = async (req, res) => {
  await ChatSchema.findOneAndDelete({ _id: req.params.id }, (err, chat) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!chat) {
          return res
              .status(404)
              .json({ success: false, error: `Chat not found` })
      }

      return res.status(200).json({ success: true, data: chat })
  }).catch(err => console.log(err))
}

getChatById = async (req, res) => {
    await ChatSchema.findOne({ _id: req.params.id }, (err, chat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!chat) {
            return res
                .status(404)
                .json({ success: false, error: `Chat not found` })
        }
        return res.status(200).json({ success: true, data: chat })
    }).catch(err => console.log(err))
}
