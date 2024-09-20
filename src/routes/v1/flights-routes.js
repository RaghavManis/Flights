// const express = require('express') ;
// const {FlightsController} = require('../../controllers') ;
// const router = express.Router() ;
// const {FlightsMiddleware} = require('../../middlewares') ;

// // /api/v1/flights POST request
// router.post('/' , FlightsMiddleware.validateRequest , FlightsController.createFlight) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder
// console.log("inside flights routes") ;

// // /api/v1/flights/id delete request
// // router.delete('/:id' , FlightsController.destroyFlight) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// // /api/v1/flights/id put request
// // router.put('/:id' , FlightsController.updateFlight) ;

// module.exports = router ;
/////////////////////////////////////////////////////////////////////////////////


const express = require('express') ;
const {FlightMiddleware} = require('../../middlewares') ;
const {FlightController} = require('../../controllers') ;
const { FlightService } = require('../../services');
const router = express.Router() ;
// you should notice one thing that we are applying middleware while we are requesting any request other that the post


// /api/v1/airport POST request
router.post('/' , FlightMiddleware.validateRequest , FlightController.createFlight) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// console.log("inside flights routes") ;

// /api/v1/flights/trips=MUM-DEL get request
// here in get request we will send data in query params , and on that basis we will filter flights ;
router.get('/' , FlightController.getAllFlights) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// /api/v1/flights/:id GET
router.get('/:id' , FlightController.getFlight) ;

// api/v1/flights/:id/seats patch
router.patch('/:id/seats' , FlightMiddleware.validateUpdateSeatsRequest , FlightController.updateSeats)

module.exports = router ; 