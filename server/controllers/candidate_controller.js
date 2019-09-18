//const CandidateSchema = require('mongoose').model('candidates').schema;
//const CandidateSchema = require('../models/user_model').candidates;
const session = require('express-session');
var mongoose = require('mongoose');
const CandidateModel = mongoose.model('candidates');


getCandidateByEmail = (req, res) => {
    let email = req.params.email;
    CandidateModel.findOne({email: email}, function(err, userData) {
        res.json(userData);
    });
};


getCandidates = async (req, res) => {
    await CandidateModel.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
};

module.exports = {
    getCandidates
};
