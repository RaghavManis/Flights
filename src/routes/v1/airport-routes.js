const express = require('express') ;
const {AirportMiddlewares} = require('../../middlewares') ;
const {AirportController} = require('../../controllers') ;
const router = express.Router() ;
// you should notice one thing that we are applying middleware while we are requesting any request other that the post


// /api/v1/airport POST request
router.post('/' , AirportMiddlewares.validateRequest , AirportController.createAirport) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// /api/v1/airplanes get request
router.get('/' , AirportController.getAirports) ;

// /api/v1/airplanes:id get request
router.get('/:id' , AirportController.getAirport) ;

// /api/v1/airplanes:id delete request
router.delete('/:id' , AirportController.destroyAirport) ;

// /api/v1/airplanes/:id PATCH request
router.put('/:id' , AirportController.updateAirport) ;

module.exports = router ;