const express = require('express');
const v1Routes = require('./v1');
const router = express.Router();

router.use('/v1', v1Routes); // Corrected route path

module.exports = router; // Fixed typo
