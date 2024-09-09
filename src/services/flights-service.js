// do you know what services do actually ..... repository me to logic likha hota hai use operate to yha se krte hain 
const { StatusCodes } = require('http-status-codes');
const {FlightsRepository} = require('../repositories') ;
const AppError = require('../utills/errors/app-error');

// creating an object of the AirplaneRepository class
const flightsRepository = new FlightsRepository();

async function createFlight(data) {
    try {
        const flight = await flightsRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error) ;
        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
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
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyFlight(id){
    console.log(id) ;
    try {
        const flight = await flightsRepository.destroy(id) ;
        return flight ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("flight you requested for remove from database , is not present in the database" , StatusCodes.NOT_FOUND) ;
        }
        throw new AppError("can't delete the requested flight" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function updateFlight(id , data){
    try {
        const flight = await flightsRepository.update(id, data) ;
        return flight ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("flight you want to update is not present in the datbase" ,error.statusCodes) ;
        }
        throw new AppError("unable to update flight" , statusCodes.INTERNAL_SERVER_ERROR) ;
    }
}
module.exports={
    createFlight,
    destroyFlight,
    updateFlight
}