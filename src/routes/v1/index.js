const express = require('express');
const {infoController} = require('../../controllers') ;
const router = express.Router();


// instead  of doing this, let's learn the use controllers
// router.get('/info', (request, response) => {
//     return response.json({
//         message: "okay"
//     });
// });


//same upper thing by using controllers
router.get('/info', infoController.info );

module.exports = router;
