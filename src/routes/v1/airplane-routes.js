const express = require('express') ;

const {AirplaneController} = require('../../controllers') ;
const router = express.Router() ;

// /api/v1/airplanes POST request
router.post('/' , AirplaneController.createAirplane) ; // yes here you have to call the createAirplane function of the airplane-controller.js file in controller folder

module.exports = router ;