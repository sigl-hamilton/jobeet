const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const UserSchema = require('./models/user_model');
const UserCtrl = require('./controllers/user_controller');
const passport = require('passport');

const cors = require('cors');
const app = express();
const apiPort = 3000;

//Db connection
const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const router = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session
app.use(session({
    secret: 'work hard',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', router);

app.post('/api/register', function(req, res) {
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
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy (
    {usernameField: 'email'},
    function(username, password, done) {
        UserCtrl.getUserByEmail(username, function(err, user){
            if(err) throw err;
            if(!user) { return done(null, false, {message: 'Unknown User'}); }
            UserSchema.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserCtrl.getUserById(id, function(err, user) {
        done(err, user);
    });
});

app.post('/api/login',
    passport.authenticate('local'),
    function(req, res) {
        console.log("LOGIN");
        res.send(req.user);
    }
);

// Endpoint to get current user
app.get('/user', function(req, res){
    console.log(req.user);
    res.send(req.user);
});

// Endpoint to logout
app.get('/logout', function(req, res){
    req.logout();
    res.send(null)
});
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
