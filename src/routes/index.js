const express = require('express');
const v1Routes = require('./v1');
const router = express.Router();
console.log("inside main index of routes") ;
router.use('/v1', v1Routes); // Corrected route path

module.exports = router; // Fixed typo
