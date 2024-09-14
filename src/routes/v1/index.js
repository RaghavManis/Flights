const express = require('express');
const {infoController} = require('../../controllers') ;
const airplaneRoutes = require('./airplane-routes') ;
const cityRoutes = require('./city-routes') ;
const flightsRoutes = require('./flights-routes') ;
const airportRoutes = require('./airport-routes')
const router = express.Router();


// instead  of doing this, let's learn the use controllers
// router.get('/info', (request, response) => {
//     return response.json({
//         message: "okay"
//     });
// });

console.log("inside v1Routes") ;
router.use('/airplanes' , airplaneRoutes) ; // this router is not calling controller form here , controller will call in airplane-routes.js
router.use('/cities' , cityRoutes) ;
router.use('/flights' , flightsRoutes) ;
router.use('/airports' , airportRoutes) ;

//same upper thing by using controllers
router.get('/info', infoController.info ); // this is calling the conntroller from here only but the airplane route is not calling the controller from here 


module.exports = router;
