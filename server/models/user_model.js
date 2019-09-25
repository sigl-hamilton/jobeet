const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: { type: String, trim: true, required: true },
        lastname: { type: String, trim: true, required: true },
        description: { type: String},
        phone: { type: String},
        email: { type: String, unique: true, required: true },
        passwordHash: { type: String, required: true },
        user_type: {
            type: String,
            enum: ['CANDIDATE', 'RECRUITER', 'ADMIN'],
            default: 'CANDIDATE'
        },
        cv: {type: String },
        jobs: [{type: mongoose.Schema.Types.ObjectId,ref: 'Job'}],
        job_status: {
            type: String,
            enum: ['ACTIVE', 'PASSIVE', 'INACTIVE'],
            default: 'ACTIVE'
        },
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanySchema'},
    },
    { timestamps: true },
);

module.exports = mongoose.model('users', UserSchema);

