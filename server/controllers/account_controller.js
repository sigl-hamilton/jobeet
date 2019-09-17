const Account = require('../models/account_model');
const bcrypt = require('bcrypt');
const session = require('express-session');

signUp = (req, res) => {
    let {username, email, password} = req.body; // this is called destructuring. We're extracting these variables and their values from 'req.body'

    let userData = {
        username,
        password: bcrypt.hashSync(password, 5), // we are using bcrypt to hash our password before saving it to the database
        email
    };

    let newUser = new Account(userData);
    newUser.save().then(error => {
        if (!error) {
            return res.status(201).json('signup successful')
        } else {
            if (error.code ===  11000) { // this error gets thrown only if similar user record already exist.
                return res.status(409).send('user already exist!')
            } else {
                console.log(JSON.stringify(error, null, 2)); // you might want to do this to examine and trace where the problem is emanating from
                return res.status(500).send('error signing up user')
            }
        }
    })
}

/*
2. User Sign in
=============
*/
logIn = (req, res) => {
  let {username, password} = req.body;
    Account.findOne({username: username}, 'username email password', (err, userData) => {
    	if (!err) {
        	let passwordCheck = bcrypt.compareSync(password, userData.password);
        	if (passwordCheck) { // we are using bcrypt to check the password hash from db against the supplied password by user
                req.session.user = {
                  email: userData.email,
                  username: userData.username,
                  id: userData._id
                }; // saving some user's data into user's session
                req.session.user.expires = new Date(
                  Date.now() + 3 * 24 * 3600 * 1000 // session expires in 3 days
                );
                res.status(200).send('You are logged in, Welcome!');
            } else {
            	res.status(401).send('incorrect password');
            }
        } else {
        	res.status(401).send('invalid login credentials')
        }
    })
}

module.exports = {
    signUp,
    logIn
}
