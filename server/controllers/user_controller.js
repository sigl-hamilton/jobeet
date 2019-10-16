const UserSchema = require('../models/user_model');
const CompanySchema = require('../models/company_model');
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
            user_type: req.body.user_type
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
    return res.status(200).json({ success: true, data: req.user });
}

logout = (req, res) => {
    req.logout();
    return res.status(200).json({ success: true })
}

getCurrentUser = (req, res) => {
    return res.status(200).json({ success: true, data: req.user });
}

getUserByEmail = (email, callback) => {
    var query = {email: email};
    UserSchema.findOne(query, callback);
};

getDeserializeUser = function(id, callback){
    UserSchema.findById(id, callback);
};

getUserById =  (req, res) => {
    UserSchema.findOne({ _id: req.params.id}).exec((err, user) => {
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
    if (body.user_type === 'RECRUITER') {
        return updateRecruiter(req.params.id, body, res);
    }
};

updateCandidate = (id, body, res) => {
    UserSchema.findOne({ _id: id, "user_type": "CANDIDATE" }, (err, user) => {
        if (err) {
            return res.status(404).json({ err, message: 'Candidate not found!',})
        }
        user.firstname = body.firstname;
        user.lastname = body.lastname;
        user.email = body.email;
        user.phone = body.phone;
        user.description = body.description;
        user.job_status = body.job_status;
        user.labels = body.labels;
        user.save()
            .then(() => {
                return res.status(200).json({success: true, id: user._id, message: 'Candidate updated!'})
            })
            .catch(error => {
                return res.status(404).json({ error, message: 'Candidate not updated!' })
            });
    });
};

getCandidateById = (req, res) => {
    UserSchema.findOne({ _id: req.params.id, "user_type": "CANDIDATE"}).populate('labels')
        .exec( (err, candidate) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidate) {
            return res
                .status(404)
                .json({ success: false, error: `Candidate not found` })
        }
        return res.status(200).json({ success: true, data: candidate })
    })
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
    UserSchema.findOne({ _id: req.params.id, 'user_type' : 'RECRUITER'}).populate('company').populate('jobs')
        .exec((err, recruiter) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }
        if (!recruiter) {
            return res
                .status(404)
                .json({ success: false, error: `Recruiter not found` })
        }
        return res.status(200).json({ success: true, data: recruiter })
    });
};

const getRecruiters = (req, res) => {
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

updateRecruiter = (id, body, res) => {
    UserSchema.findOne({ _id: id, "user_type": "RECRUITER" }, (err, user) => {
        if (err) {
            return res.status(404).json({ err, message: 'Recruiter not found!',})
        }
        user.firstname = body.firstname;
        user.lastname = body.lastname;
        user.email = body.email;
        user.phone = body.phone;
        user.description = body.description;
        const oldCompany = user.company;
        user.company = body.company;

        user.save().then(() => {
                if (user.company && (user.company._id !== oldCompany._id)) {
                        CompanySchema.findById(body.company._id, (err, company) => {
                            company.recruiters.push({_id: user._id});
                            company.save();
                        });
                        CompanySchema.findById(oldCompany._id, (err, company) => {
                            company.recruiters.pull({_id: user._id});
                            company.save();
                        });
                    }
                return res.status(200).json({success: true, id: user._id, message: 'Recruiter updated!'})
            })
            .catch(error => {
                return res.status(404).json({ error, message: 'Recruiter not updated!' })
            });
    });
};

getPotentialCandidates = (req, res) => {
    const jobLabels = req.body.labels.map(label => { return label._id });
    UserSchema.find({"user_type" : "CANDIDATE"}).populate('labels').exec((err, candidates) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        let potentialCandidates = candidates.map(candidate => {
            const candidateLabels = jobLabels.filter(label => candidate.labels.map(label => {return label._id }).includes(label));
            const candidateMatchPercent = (candidateLabels.length / jobLabels.length) * 100;
            if (candidateMatchPercent > req.body.matchPercent) {
                candidate = {candidate: candidate, matchPercent: Math.round(candidateMatchPercent)};
                return candidate;
            } else {
                return null;
            }
        });
        if (!potentialCandidates.length) {
            return res
                .status(404)
                .json({ success: false, error: `Candidate not found` })
        }

        return res.status(200).json({
            success: true,
            data: potentialCandidates.filter(candidate => candidate != null)
        });
    });
};

module.exports = {
  //  signUp,
    register,
    login,
    logout,
    getDeserializeUser,
    getUserByEmail,
    getCurrentUser,
    getUserById,
    updateUserById,
    getCandidates,
    getCandidateById,
    getPotentialCandidates,
    getRecruiters,
    getRecruiterById,
    getUsers,
};
