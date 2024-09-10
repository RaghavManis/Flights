const {AirplaneService} = require('../services') ;
const {StatusCodes} = require('http-status-codes') ;
const {ErrorResponse , SuccessResponse} = require('../utills/common') ;
const AppError = require('../utills/errors/app-error');

/**
 * POST : /airplanes
 * req-body {modelNumber : "airplane_name" , capacity:"value"} 
 */
async function createAirplane(req , res){
  try {
      // console.log("inside try block of controller");
      // console.log(req.body);
      const airplane = await AirplaneService.createAirplane({ // don't forgrt to add await
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
        // ErrorResponse.message = "something went wrong while creating the airplane (we are in airplane controller)" ;
        ErrorResponse.error = error ;
        return res
                  // .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .status(error.statusCodes) // since we already importing error from repo file and in repo file error is already set up so 
                                             // just use that error code here instead of hard coding of same error error 
                  .json(ErrorResponse) ;
    }
}


/**
 * get : /airplanes
 * req-body {} 
 */
async function getAirplanes(req,  res){
  try {
    const airplanes = await AirplaneService.getAirplanes() ;
    SuccessResponse.data = airplanes ;
    return res 
              .status(StatusCodes.OK)
              .json(SuccessResponse) ;
    
  } catch (error) {// no need to handle error saperately , since error coming from airplaneService need already contains the details so use that
    ErrorResponse.error = error ;
    return res  
              .status(error.statusCodes)
              .json(ErrorResponse) ;
  }
}

/**
 * get : /airplanes:id
 * req-body {} 
 */
async function getAirplane(req,  res){
  console.log(req.params.id) ; // console for checkiing that your id coming without any error
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id) ;
    SuccessResponse.data = airplane ;
    return res 
              .status(StatusCodes.OK)
              .json(SuccessResponse) ;
    
  } catch (error) {// no need to handle error saperately , since error coming from airplaneService need already contains the details so use that
    ErrorResponse.error = error ;
    return res  
              .status(error.statusCodes)
              .json(ErrorResponse) ;
  }
}

async function destroyAirplane(request , response){
  console.log(request.params.id) ;
  try {
    const airplane = await AirplaneService.destroyAirplane(request.params.id) ;
    SuccessResponse.data = airplane ;
    return response
                   .status(StatusCodes.OK)
                   .json(SuccessResponse) ;
  } catch (error) {// no need to handle error saperately , since error coming from airplaneService need already contains the details so use that
    ErrorResponse.error=  error ;
    return response
                   .status(error.statusCodes)
                   .json(ErrorResponse) ;
  }
}

async function updateAirplane(req , res){
  try {
    const airplane = await AirplaneService.updateAirplane(req.params.id , {
      modelNumber:req.body.modelNumber,
      capacity : req.body.capacity
    })
    SuccessResponse.data = airplane ;
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse) ;
  } catch (error) {// no need to handle error saperately, since error coming from airplaneService need already contains the details so use that
    ErrorResponse.error = error ;
    return res
             .status(error.statusCodes)
             .json(ErrorResponse) ;
  }
}
module.exports = {
    createAirplane ,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}