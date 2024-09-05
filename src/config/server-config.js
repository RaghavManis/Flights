const dotenv = require('dotenv') ;

dotenv.config() ; // wil add all the enviroment variable to the process.env

module.exports = {
    PORT : process.env.PORT
}
