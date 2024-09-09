const express = require('express') ;
const {FlightsController} = require('../../controllers') ;
const router = express.Router() ;
const {FlightsMiddleware} = require('../../middlewares') ;

// /api/v1/cities POST request
router.post('/' , FlightsMiddleware.validateRequest , FlightsController.createFlight) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// /api/v1/cities/id delete request
router.delete('/:id' , FlightsController.destroyFlight) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// /api/v1/cities/id put request
router.put('/:id' , FlightsController.updateFlight) ;

module.exports = router ;