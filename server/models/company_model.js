const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema(
    {
        name: {
            type: String, required: true
        },
        description: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: false
        },
        labels: {
            type: [String],
            required: true
        },
        recruiters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RecruiterUserSchema'
        }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('company', CompanySchema);
