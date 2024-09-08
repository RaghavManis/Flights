// do you know what services do actually ..... repository me to logic likha hota hai use operate to yha se krte hain 
const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utills/errors/app-error');

// creating an object of the AirplaneRepository class
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            // console.log(error);
            // Iterate over the errors array and collect messages
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            // console.log(explanation);  // this will give you the all details of error which is stored in the above explanation
            // Throwing a BadRequest error with the collected messages
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        // Throwing a generic Internal Server Error if the error is not a validation error
        throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane
};
