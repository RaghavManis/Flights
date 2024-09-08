const express = require('express');
const {infoController} = require('../../controllers') ;
const airplaneRoutes = require('./airplane-routes') ;
const router = express.Router();


// instead  of doing this, let's learn the use controllers
// router.get('/info', (request, response) => {
//     return response.json({
//         message: "okay"
//     });
// });


router.use('/airplanes' , airplaneRoutes) ; // this router is not calling controller form here , controller will call in airplane-routes.js

//same upper thing by using controllers
router.get('/info', infoController.info ); // this is calling the conntroller from here only but the airplane route is not calling the controller from here 


module.exports = router;
