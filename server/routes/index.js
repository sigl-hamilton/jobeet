const express = require("express");
const jobRoutes = require('./job');
const accountRoutes = require('./account');
const userRoutes = require('./user');
const candidateRoutes = require('./candidate');
const recruiterRoutes = require('./recruiter');
const labelRoutes = require('./label');
const router = express.Router();

router.use("/job", jobRoutes);
router.use("/account", accountRoutes);
router.use("/user", userRoutes);
router.use("/candidate", candidateRoutes);
router.use("/recruiter", recruiterRoutes);
router.use("/label", labelRoutes);

module.exports = router;
