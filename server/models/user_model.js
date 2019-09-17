const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Schema = mongoose.Schema;
const JobSchema = require('mongoose').model('Job');
const CompanySchema = require('mongoose').model('CompanySchema');

const UserSchema = new Schema(
    {
        firstname: { type: String, trim: true, required: true },
        lastname: { type: String, trim: true, required: true },
        description: { type: String},
        phone: { type: String},
        email: { type: String, unique: true, required: true },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true },
);

const CandidateUserSchema = extendSchema(UserSchema, {
    cv: {type: String, required: true},
    jobs: {type: [JobSchema]},
    job_status: {
        type: String,
        enum: ['ACTIVE', 'PASSIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
});

const RecruiterUserSchema = extendSchema(UserSchema, {
    company: {type: CompanySchema},
    jobs: {type: [JobSchema]},
});

const AdminUserSchema = extendSchema(UserSchema, {

});

module.export = mongoose.model('users', UserSchema);
module.export = mongoose.model('admins', CandidateUserSchema);
module.export = mongoose.model('recruiters', RecruiterUserSchema);
