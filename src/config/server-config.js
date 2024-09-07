// src/config/server-config.js
const dotenv = require('dotenv');

dotenv.config();

console.log('Loaded PORT:', process.env.PORT); // Debugging line

module.exports = {
    PORT: process.env.PORT
};
