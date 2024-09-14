// do you know what services do actually ..... repository me to logic likha hota hai use operate to yha se krte hain 
const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utills/errors/app-error');

// creating an object of the AirplaneRepository class
const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        console.log(data) ;
        const airport = await airportRepository.create(data);
        console.log("successfully pass the airport services "); 
        return airport;
    } catch (error) {
        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            // Iterate over the errors array and collect messages
            error.errors.forEach((err) => {
                explanation.push(err.message);
            }); 
            // console.log(explanation);  // this will give you the all details of error which is stored in the above explanation
            // Throwing a BadRequest error with the collected messages
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        // Throwing a generic Internal Server Error if the error is not a validation error
        throw new AppError('Cannot create a new airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airport = await airportRepository.getAll() ;
        return airport ;
    } catch (error) {
        throw new AppError("cannot fetch data of all airport" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id) ;
        // if(!airplane){ // wrong way 
        //     throw new AppError("airplane you requested is not found in database" , StatusCodes.NOT_FOUND) ;
        // }
        return airport ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("airport you requested is not in my database" , error.statusCodes) ;
        }
        throw new AppError("cannot fetch data of all airport" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function destroyAirport(id){
    console.log(id) ;
    try {
        const airport = await airportRepository.destroy(id) ;
        return airport ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("airport you requested for remove from database , is not present in the database" , StatusCodes.NOT_FOUND) ;
        }
        throw new AppError("can't delete the requested airport" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}
async function updateAirport(id , data){
    try {
        const  airport = await airportRepository.update(id, data) ;
        return airport ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("airport you want to update is not present in the datbase" ,error.statusCodes) ;
        }
        throw new AppError("unable to update airport" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
};
