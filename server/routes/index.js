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
  /*
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (request, response, next) => {
    if (request.user && isAllowed(request.user.user_type))
      next(); // role is allowed, so continue on the next middleware
    else {
      response.status(403).json({message: "Forbidden"}); // user is forbidden
    }
  }

   */
}
// permit("CANDIDATE", "RECRUITER")
router.use("/job", jobRoutes);
router.use("/account", accountRoutes);
router.use("/user", userRoutes);
router.use("/candidate", candidateRoutes);
router.use("/recruiter", recruiterRoutes);
router.use("/label", labelRoutes);
router.use("/company", companyRoutes);
router.use("/chat", chatRoutes);

router.post('/register', UserCtrl.register);
router.post('/login',  passport.authenticate('local', {session: true} ), UserCtrl.login);

module.exports = router;
