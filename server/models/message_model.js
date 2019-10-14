const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
        message: { type: String, required: true},
    },
    { timestamps: true },
);

module.exports = mongoose.model('messages', MessageSchema);
