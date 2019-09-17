const express = require("express");
const jobRoutes = require('./job');
const accountRoutes = require('./account');
const router = express.Router();

router.use("/job", jobRoutes);
router.use("/account", accountRoutes);

module.exports = router;
