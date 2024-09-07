const { AirplaneRepository } = require('../repositories'); // yes in airplane repo we are not exporting the object , we exporting the class but 
                                                           // that class goes to the index.js of the repo folder and from there object is being 
                                                           // exported , so that's why we are derefrencing that object here
const AppError = require('../utills/errors/app-error') ;
const {StatusCodes} = require('http-status-codes') ;

const airplaneRepository = new AirplaneRepository() ;      // making object of the class which we have created in airplaneRepository in 
                                                           // repo folder... and since this class is inheriting the crud repo so we can make call
                                                           // of any crud operation by this object 

async function createAirplane(data){ // data will come in object form ....if not understand how it is coming in object then go to the airplane-controller.js and see the function createPlane
    try {
        // console.log("inside try block of airplane service.js") ;
        const airplane = await airplaneRepository.create(data) ;
        return airplane ;
    } catch (error) {
        console.log(error) ;
        
        // instead of just throwing error , use the AppError class which you have made 
        if(error.name == "TypeError"){
            throw new AppError("cannot create an airplane" , StatusCodes.INTERNAL_SERVER_ERROR ) ;  
            // since we are not setup the error handling in repository so we will set that error code here and once we set this then we don't 
            // need to set it again in controller , you just use this error there by with the help of error return from here
        }
        throw error ;
    }
}

module.exports = {
    createAirplane
}