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

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll() ;
        return airplanes ;
    } catch (error) {
        throw new AppError("cannot fetch data of all airplanes" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id) ;
        // if(!airplane){ // wrong way 
        //     throw new AppError("airplane you requested is not found in database" , StatusCodes.NOT_FOUND) ;
        // }
        return airplane ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("airplane you requested is not in my database" , error.statusCodes) ;
        }
        throw new AppError("cannot fetch data of all airplanes" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

async function destroyAirplane(id){
    console.log(id) ;
    try {
        const airplane = await airplaneRepository.destroy(id) ;
        return airplane ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("airplane you requested for remove from database , is not present in the database" , StatusCodes.NOT_FOUND) ;
        }
        throw new AppError("can't delete the requested airplane" , StatusCodes.INTERNAL_SERVER_ERROR) ;
    }
}
async function updateAirplane(id , data){
    try {
        const airplane = await airplaneRepository.update(id, data) ;
        return airplane ;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("airplane you want to update is not present in the datbase" ,error.statusCodes) ;
        }
        throw new AppError("unable to update airplane" , statusCodes.INTERNAL_SERVER_ERROR) ;
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};
