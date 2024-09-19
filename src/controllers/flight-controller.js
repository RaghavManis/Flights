// const {StatusCodes} = require('http-status-codes') ;
// const {FlightsService} = require('../services') ;
// const {SuccessResponse , ErrorResponse} = require('../utills/common') ;
// // const AppError = require('../utills/errors/app-error');
// // controller me throw nhh krna hai , ye last point hai , yha se response hi return hoga always 
// // second thing set the data here which you will pass in the model for creating entry


// /**
//  * POST : /flights
//  * req-body {flightNumber : 'UK 888,
//             price : 20000 ,
//             airplaneId : 'a380' ,
//             departureAirportId : 12 ,
//             arrivalAirportId : 11 ,
//             arrivalTime : 11.00.00 ,
//             departureTime : 10.00.00 ,
//             boardingGate : '13A' ,
//             totalSeats : 222 ,}
//  */
// async function createFlight(req , res){
//   console.log("inside flights controller ") ;
//     try {
//         const flight = await FlightsService.createFlight({
//             // id : req.body.id ,
            // flightNumber : req.body.flightNumber ,
            // price : req.body.price ,
            // airplaneId : req.body.airplaneId ,
            // departureAirportId : req.body.departureAirportId ,
            // arrivalAirportId : req.body.arrivalAirportId ,
            // arrivalTime : req.body.arrivalTime ,
            // departureTime : req.body.departureTime ,
            // boardingGate : req.body.boardingGate ,
            // totalSeats : req.body.totalSeats ,
//         })
//         SuccessResponse.data = flight ;
//         SuccessResponse.message = "successfully created the flight" ;
//         return res
//                  .status(StatusCodes.OK) 
//                  .json(SuccessResponse) ;
//     } catch (error) {
//         ErrorResponse.error = error ;
//         return res
//                  .status(error.statusCodes)
//                  .json(ErrorResponse) ;
//     }
// }

// // async function destroyFlight(request , response){
// //     // console.log(request.params.id) ;
// //     try {
// //       const flight = await CityService.destroyFlight(request.params.id) ;
// //       SuccessResponse.data = flight ;
// //       SuccessResponse.message = "successfully deleted given flight " ;
// //       return response
// //                      .status(StatusCodes.OK)
// //                      .json(SuccessResponse) ;
// //     } catch (error) {// no need to handle error saperately , since error coming from airplaneService need already contains the details so use that
// //       ErrorResponse.error=  error ;
// //       return response
// //                      .status(error.statusCodes)
// //                      .json(ErrorResponse) ;
// //     }
// //   }

   
// // async function updateFlight(req , res){
// //     try {
// //       const flight = await CityService.updateCity(req.params.id , {
// //             id : req.body.id ,
// //             price : req.body.price ,
// //             name : req.body.name ,
// //             destination : req.body.destination ,
// //             idarrival : req.body.idarrival ,
// //             idarrivelTime : req.body.idarrivelTime ,
// //             departureTime : req.body.departureTime ,
// //       })
// //       SuccessResponse.data = flight ;
// //       SuccessResponse.message = "succefully updated flight with given flight id" ;
// //       return res
// //                 .status(StatusCodes.OK)
// //                 .json(SuccessResponse) ;
// //     } catch (error) {// no need to handle error saperately, since error coming from airplaneService need already contains the details so use that
// //       ErrorResponse.error = error ;
// //       return res
// //                .status(error.statusCodes)
// //                .json(ErrorResponse) ;
// //     }
// //   }

// module.exports = {
//     createFlight,
//     // destroyFlight,
//     // updateFlight
// }
////////////////////////////////////////////////////////////////////////////////
const {FlightService} = require('../services') ;
const {StatusCodes} = require('http-status-codes') ;
const {ErrorResponse , SuccessResponse} = require('../utills/common') ;
const AppError = require('../utills/errors/app-error');

/**
 * POST : /flights
 * req-body {flightNumber : 'UK 888,
//             price : 20000 ,
//             airplaneId : 'a380' ,
//             departureAirportId : 12 ,
//             arrivalAirportId : 11 ,
//             arrivalTime : 11:00:00 ,
//             departureTime : 10:00:00 ,
//             boardingGate : '13A' ,
//             totalSeats : 222 ,} 
 */
async function createFlight(req , res){
  try {
      const flight = await FlightService.createFlight({ 
            flightNumber : req.body.flightNumber ,
            airplaneId : req.body.airplaneId ,
            departureAirportId : req.body.departureAirportId ,
            arrivalAirportId : req.body.arrivalAirportId ,
            arrivalTime : req.body.arrivalTime ,
            departureTime : req.body.departureTime ,
            price : req.body.price ,
            boardingGate : req.body.boardingGate ,
            totalSeats : req.body.totalSeats ,
      });
      SuccessResponse.data = flight ;
      SuccessResponse.message = "successfully create an airport " ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse) ;
      } catch (error) {
        ErrorResponse.error = error ;
        return res
                  .status(error.statusCodes) 
                  .json(ErrorResponse) ;
    }
}
 
async function getAllFlights(req , res){
  try {
    const flights = await FlightService.getAllFlights(req.query) ;
    console.log("inside flight controller") ;
        SuccessResponse.message = "successfully fetch the data on basis of filters ";
        SuccessResponse.data = flights ;
        // SuccessResponse.data = flights ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse) ;
    } catch (error) {
      ErrorResponse.error = error ;
        return res
                  .status(error.statusCodes) 
                  .json(ErrorResponse) ;
    }
}


/**
 * get : /flight:id
 * req-body {} 
 */
async function getFlight(req,  res){
  try {
    const flight = await FlightService.getFlight(req.params.id) ;
    SuccessResponse.data = flight ;
    return res 
              .status(StatusCodes.OK)
              .json(SuccessResponse) ;
    
  } catch (error) {// no need to handle error saperately , since error coming from airplaneService need already contains the details so use that
    ErrorResponse.error = error ;
    return res  
              .status(error.statusCodes)
              .json(ErrorResponse) ;
  }
}
module.exports = {
    createFlight ,
    getAllFlights ,
    getFlight
}