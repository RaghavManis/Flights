const {AirplaneService} = require('../services') ;
const {StatusCodes} = require('http-status-codes') ;
const {ErrorResponse , SuccessResponse} = require('../utills/common') ;
// const { response } = require('express');

// const { createAirplane } = require('../services/airplane-service');

async function createAirplane(req , res){
  try {
      // console.log("inside try block of controller");
      // console.log(req.body);
      const airplane = await AirplaneService.createAirplane({
        modelNumber: req.body.modelNumber ,
        capacity: req.body.capacity 
      });
        // return res.status(StatusCodes.CREATED)
        //           .json({
        //             success:true ,
        //             message:"successfully create an airplane",
        //             data:airplane ,
        //             error:{}
        //           })

        // ...........................INSTEAD OF DOING SAME THING AGAIN AND AGAIN JUST DO IT ONCE ...............................
        SuccessResponse.message = "successfully create an airplane" ;
        SuccessResponse.data = airplane ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse) ;
      } catch (error) {
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        //           .json({
          //             success:false ,
          //             message:"something went wrong while creating the airplane",
          //             data : {},
          //             error:error
          //           })
          
          // ...........................INSTEAD OF DOING SAME THING AGAIN AND AGAIN JUST DO IT ONCE .............................
        ErrorResponse.message = "something went wrong while creating the airplane (we are in airplane controller)" ;
        ErrorResponse.error = error ;
        return res
                  // .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .status(error.statusCode) // since we already importing error from repo file and in repo file error is already set up so 
                                             // just use that error code here instead of hard coding of same error error 
                  .json(ErrorResponse) ;
    }
}

module.exports = {
    createAirplane
}