const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Schema = mongoose.Schema;
//var JobSchema = new mongoose.model('jobs');
//const CompanySchema = mongoose.model('companies');

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
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    job_status: {
        type: String,
        enum: ['ACTIVE', 'PASSIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
});

const RecruiterUserSchema = extendSchema(UserSchema, {
   // company: {type: CompanySchema},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanySchema'},
    jobs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}],
});

const AdminUserSchema = extendSchema(UserSchema, {

});

module.exports = mongoose.model('users', UserSchema);
module.exports = mongoose.model('admins', CandidateUserSchema);
module.exports = mongoose.model('recruiters', RecruiterUserSchema);
