const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const RecruiterUserSchema = require('mongoose').model('recruiters');

const CompanySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        logo: { type: String, required: true },
        recruiters: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  //      recruiters: { type: [RecruiterUserSchema] },
    },
    { timestamps: true },
);

module.exports = mongoose.model('company', CompanySchema);
