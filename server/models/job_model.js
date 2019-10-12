const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Job = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        labels: [{type: mongoose.Schema.Types.ObjectId, ref: 'labels'}],
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'companies'},

    },
    { timestamps: true },
);

module.exports = mongoose.model('jobs', Job);
