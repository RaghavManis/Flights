// // do you know what services do actually ..... repository me to logic likha hota hai use operate to yha se krte hain 
// const { StatusCodes } = require('http-status-codes');
// const {FlightsRepository} = require('../repositories') ;
// const AppError = require('../utills/errors/app-error');

// // creating an object of the AirplaneRepository class
// const flightsRepository = new FlightsRepository();

// console.log("insode flights service.js") ;
// async function createFlight(data) {
//     console.log(data) ;
//     try {
//         const flight = await flightsRepository.create(data);
//         return flight;
//     } catch (error) {
//         console.log(error) ;
//         if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
//             let explanation = [];
//             // console.log(error); 
//             // Iterate over the errors array and collect messages
//             error.errors.forEach((err) => {
//                 explanation.push(err.message);
//             });
//             // console.log(explanation);  // this will give you the all details of error which is stored in the above explanation
//             // Throwing a BadRequest error with the collected messages
//             throw new AppError(explanation, StatusCodes.BAD_REQUEST);
//         }
//         // Throwing a generic Internal Server Error if the error is not a validation error
//         throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

// async function destroyFlight(id){
//     console.log(id) ;
//     try {
//         const flight = await flightsRepository.destroy(id) ;
//         return flight ;
//     } catch (error) {
//         if(error.statusCodes == StatusCodes.NOT_FOUND){
//             throw new AppError("flight you requested for remove from database , is not present in the database" , StatusCodes.NOT_FOUND) ;
//         }
//         throw new AppError("can't delete the requested flight" , StatusCodes.INTERNAL_SERVER_ERROR) ;
//     }
// }

// async function updateFlight(id , data){
//     try {
//         const flight = await flightsRepository.update(id, data) ;
//         return flight ;
//     } catch (error) {
//         if(error.statusCodes == StatusCodes.NOT_FOUND){
//             throw new AppError("flight you want to update is not present in the datbase" ,error.statusCodes) ;
//         }
//         throw new AppError("unable to update flight" , statusCodes.INTERNAL_SERVER_ERROR) ;
//     }
// }
// module.exports={
//     createFlight,
//     destroyFlight,
//     updateFlight
// }
////////////////////////////////////////////////////////////////////////////////////////////////
// do you know what services do actually ..... repository me to logic likha hota hai use operate to yha se krte hain 
const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utills/errors/app-error');
const {Op} = require('sequelize') ;

// creating an object of the AirplaneRepository class
const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        
        // console.log("inside flight service try")
        console.log(typeof data) ;
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        // console.log("inside flight service catch")
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
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [] ;
    let queryTripEndingTime = " 23:59:00"
    if(query.trips){
        [departureAirportId , arrivalAirportId] = query.trips.split("-") ;
        customFilter.departureAirportId =departureAirportId ;
        customFilter.arrivalAirportId = arrivalAirportId ;
    }
    if(query.price){
        [minPrice , maxPrice] = query.price.split("-") ;
        customFilter.price = {
            [Op.between]:[minPrice , maxPrice] ,
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        // console.log("fsgbwdjchgfbhf" + query.tripDate) ;
        // console.log("----->"+query.tripDate) ;
        customFilter.departureTime = {
            // [Op.gte]:[query.tripDate] , // if you give like this then it through error
            // [Op.gte]:query.tripDate ,
            // something is wrong in the below command 
            [Op.between]:[query.tripDate , query.tripDate + queryTripEndingTime ] // beacuse Op.gte except an single integer for comparing not an array
        }
    }
    if(query.sort){
        const params = query.sort.split(',') ; // params will be a array containing data like this [departureTime_ASC , price_DESC]
        // map function work on the each element of array , since we are again using the split which will further 
        // split the element and gid give array, so data will be somthing like array of arrays ---->
        //  [[departureTime , ASC] , [price , DESC]]; 

        // chutiye insan note it down ---> In JavaScript, when you use curly braces {}, you need to use the return statement to return a value
        //                                 from the function. Otherwise, the function implicitly returns undefined.
        const sortFilters = params.map((param)=>{ return param.split("_")}) ; 
        // const sortFilters = params.map((param)=> param.split("_")) ;  // use any one of above 

        sortFilter = sortFilters ;
    }
    // console.log("in flight service getallFlights function"+sortFilter) ;
    try {
        const response = flightRepository.getAllFlights(customFilter , sortFilter) ; // here we are passong two arguments for filtering 
        console.log( "type of response in service is = " + typeof response) ;
        return response ;
    } catch (error) {
        throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

module.exports = {
    createFlight,
    getAllFlights,
};
