const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: { type: String, trim: true, required: true },
        lastname: { type: String, trim: true, required: true },
        description: { type: String},
        phone: { type: String},
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
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

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    console.log('MODEL');
    UserSchema.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    UserSchema.findById(id, callback);
};

