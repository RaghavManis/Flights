const express = require('express') ;
const {AirplaneMiddlewares} = require('../../middlewares') ;
const {AirplaneController} = require('../../controllers') ;
const router = express.Router() ;

// /api/v1/airplanes POST request
router.post('/' , AirplaneMiddlewares.validateRequest , AirplaneController.createAirplane) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

// /api/v1/airplanes get request
router.get('/' , AirplaneController.getAirplanes) ;

// /api/v1/airplanes:id get request
router.get('/:id' , AirplaneController.getAirplane) ;

// /api/v1/airplanes:id delete request
console.log("destroy airplane") ;
router.delete('/:id' , AirplaneController.destroyAirplane) ;

module.exports = router ;