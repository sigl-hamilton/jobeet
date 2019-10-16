const express = require("express");
const jobRoutes = require('./job');
const accountRoutes = require('./account');
const userRoutes = require('./user');
const candidateRoutes = require('./candidate');
const recruiterRoutes = require('./recruiter');
const labelRoutes = require('./label');
const companyRoutes = require('./company');
const chatRoutes = require('./chat');

const UserCtrl = require('../controllers/user_controller');
const router = express.Router();
const passport = require('passport');

// middleware for doing role-based permissions

function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (request, response, next) => {
        user_type = request.user ? request.user.user_type : "NOT_LOGGED";
        if (isAllowed(user_type))
            next(); // role is allowed, so continue on the next middleware
        else {
            response.status(403).json({message: "Forbidden"}); // user is forbidden
    }
  }
}
// permit("CANDIDATE", "RECRUITER")
router.use("/job",  permit("CANDIDATE", "RECRUITER", "ADMIN"), jobRoutes);
router.use("/account",  permit("CANDIDATE", "RECRUITER", "ADMIN"), accountRoutes);
router.use("/user", permit("CANDIDATE", "RECRUITER", "ADMIN"), userRoutes);
router.use("/candidate",  permit("CANDIDATE", "RECRUITER", "ADMIN"), candidateRoutes);
router.use("/recruiter", permit("RECRUITER", "ADMIN"), recruiterRoutes);
router.use("/label", permit("RECRUITER", "ADMIN"), labelRoutes);
router.use("/company", permit("RECRUITER", "ADMIN"), companyRoutes);
router.use("/chat", permit("CANDIDATE", "RECRUITER", "ADMIN"), chatRoutes);

router.post('/register', permit("NOT_LOGGED"), UserCtrl.register);
router.post('/login', permit("NOT_LOGGED"), passport.authenticate('local', {session: true} ), UserCtrl.login);
router.get('/logout', permit("CANDIDATE", "RECRUITER", "ADMIN"), UserCtrl.logout);

module.exports = router;
