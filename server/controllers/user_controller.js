const UserSchema = require('../models/user_model');
const LabelSchema = require('../models/label_model');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');

register = (req, res) => {
    console.log('REGISTER');
    const password = req.body.password;
    const password2 = req.body.password2;
    if (password === password2) {
        const newUser = new UserSchema({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: req.body.password,
        });
        UserSchema.createUser(newUser, function(err, user){
            if (err) throw err;
            res.send(user).end();
        });
    } else {
        res.status(500).send("{errors: \"Password don't match\"}").end();
      //  res.status(11000).send("{errors: \"User already exist\"}").end();
    }
}

login = (req, res) => {
    console.log("LOGIN");
    res.send(req.user);
}

getCurrentUser = (req, res) => {
    res.send(req.user);
}

getUserByEmail = (email, callback) => {
    var query = {email: email};
    UserSchema.findOne(query, callback);
};

getUserById =  (req, res) => {
    UserSchema.findOne({ _id: req.params.id}).populate('labels').exec((err, user) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err });
        }
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: user });
    });
};

getUsers = function (req, res) {
    UserSchema.find({}, (err, users) => {
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

updateUserById =  (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    if (body.user_type === 'CANDIDATE') {
        return updateCandidate(req.params.id, body, res);
    }
};

updateCandidate = (id, body, res) => {
    UserSchema.findOne({ _id: id }, (err, user) => {
        if (err) {
            return res.status(404).json({ err, message: 'User not found!',})
        }
        console.log(body);
        user.firstname = body.firstname;
        user.lastname = body.lastname;
        user.email = body.email;
        user.phone = body.phone;
        user.description = body.description;
        user.job_status = body.job_status;
        user.labels = body.labels;
        user.save()
            .then(() => {
                return res.status(200).json({success: true, id: user._id, message: 'User updated!'})
            })
            .catch(error => {
                return res.status(404).json({ error, message: 'User not updated!' })
            });
    });
};

getCandidateById = (req, res) => {
    UserSchema.findOne({ id: req.params.id , "user_type" : "CANDIDATE"}, (err, candidate) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidate) {
            return res
                .status(404)
                .json({ success: false, error: `Candidate not found` })
        }
        return res.status(200).json({ success: true, data: candidate })
    }).catch(err => console.log(err))
};

const getCandidates =  (req, res) => {
    UserSchema.find({"user_type" : "CANDIDATE"}, (err, candidate) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidate.length) {
            return res
                .status(404)
                .json({ success: false, error: `Candidate not found` })
        }
        return res.status(200).json({ success: true, data: candidate })
    }).catch(err => console.log(err))
};

getRecruiterById =  (req, res) => {
    UserSchema.findOne({ id: req.params.id , "user_type" : "RECRUITER"}, (err, candidate) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidate) {
            return res
                .status(404)
                .json({ success: false, error: `Recruiter not found` })
        }
        return res.status(200).json({ success: true, data: candidate })
    }).catch(err => console.log(err))
};

const getRecruiters =  (req, res) => {
    UserSchema.find({"user_type" : "RECRUITER"}, (err, candidate) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidate.length) {
            return res
                .status(404)
                .json({ success: false, error: `Recruiter not found` })
        }
        return res.status(200).json({ success: true, data: candidate })
    }).catch(err => console.log(err))
};

module.exports = {
  //  signUp,
    register,
    login,
    getUserByEmail,
    getUserById,
    updateUserById,
    getCandidates,
    getCandidateById,
    getRecruiters,
    getRecruiterById,
    getUsers,
};
