const express = require('express') ;
const {AirplaneMiddlewares} = require('../../middlewares') ;
const {AirplaneController} = require('../../controllers') ;
const router = express.Router() ;

// /api/v1/airplanes POST request
router.post('/' , AirplaneMiddlewares.validateRequest , AirplaneController.createAirplane) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder
router.get('/' , AirplaneController.getAirplanes) ;

module.exports = router ;