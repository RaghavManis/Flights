const { AirplaneRepository } = require('../repositories'); // yes in airplane repo we are not exporting the object , we exporting the class but 
                                                           // that class goes to the index.js of the repo folder and from there object is being 
                                                           // exported , so that's why we are derefrencing that object here

const airplaneRepository = new AirplaneRepository() ;      // making object of the class which we have created in airplaneRepository in 
                                                           // repo folder... and since this class is inheriting the crud repo so we can make call
                                                           // of any crud operation by this object 

async function createAirplane(data){ // data will come in object form ....if not understand how it is coming in object then go to the airplane-controller.js and see the function createPlane
    try {
        console.log("inside try block of airplane service.js") ;
        const airplane = await airplaneRepository.create(data) ;
        return airplane ;
    } catch (error) {
        throw error ;
    }
}

module.exports = {
    createAirplane
}