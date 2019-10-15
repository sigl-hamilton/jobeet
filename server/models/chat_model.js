const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'jobs', required: true},
        userFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
        userTo: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
        messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'messages' }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('chat', ChatSchema);
