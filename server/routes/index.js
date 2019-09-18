const express = require("express");
const jobRoutes = require('./job');
const accountRoutes = require('./account');
const candidateRoutes = require('./candidate');
const router = express.Router();

router.use("/job", jobRoutes);
router.use("/account", accountRoutes);
router.use("/candidate", candidateRoutes);

module.exports = router;
