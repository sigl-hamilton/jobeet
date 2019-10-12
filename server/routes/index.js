const express = require("express");
const jobRoutes = require('./job');
const accountRoutes = require('./account');
const userRoutes = require('./user');
const candidateRoutes = require('./candidate');
const companyRoutes = require('./company')
const recruiterRoutes = require('./recruiter');
const labelRoutes = require('./label');
const companyRoutes = require('./company');
const router = express.Router();

router.use("/job", jobRoutes);
router.use("/account", accountRoutes);
router.use("/user", userRoutes);
router.use("/candidate", candidateRoutes);
router.use("/company", companyRoutes)
router.use("/recruiter", recruiterRoutes);
router.use("/label", labelRoutes);
router.use("/company", companyRoutes);

module.exports = router;
