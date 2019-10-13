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

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'mySecretKey',
    saveUninitialized: true,
    resave: false,
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({credentials: true, origin: 'http://localhost:8000'}));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    console.log("here");
    UserCtrl.getDeserializeUser(id, function(err, user) {
        done(err, user);
    });
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

app.use('/api', router);

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
