const {AirportService} = require('../services') ;
const {StatusCodes} = require('http-status-codes') ;
const {ErrorResponse , SuccessResponse} = require('../utills/common') ;
const AppError = require('../utills/errors/app-error');

/**
 * POST : /airports
 * req-body {name:'IGI' , cityId:7 , code:'DEL'} 
 */
async function createAirport(req , res){
  try {
      const airport = await AirportService.createAirport({ 
        name : req.body.name ,
        code : req.body.code ,
        address : req.body.address ,
        cityId : req.body.cityId ,
      });
        SuccessResponse.message = "successfully create an airport" ;
        SuccessResponse.data = airport ;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse) ;
      } catch (error) {
        ErrorResponse.error = error ;
        return res
                  .status(error.statusCodes) 
                  .json(ErrorResponse) ;
    }
}


/**
 * get : /airports
 * req-body {} 
 */
async function getAirport(req,  res){
  try {
    const airport = await AirportService.getAirport() ;
    SuccessResponse.data = airport ;
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
 * get : /airports/:id
 * req-body {} 
 */
async function getAirport(req,  res){
//   console.log(req.params.id) ; // console for checkiing that your id coming without any error
  try {
    const airport = await AirportService.getAirport(req.params.id) ;
    SuccessResponse.data = airport ;
    return res 
              .status(StatusCodes.OK)
              .json(SuccessResponse) ;
    
  } catch (error) {
    ErrorResponse.error = error ;
    return res  
              .status(error.statusCodes)
              .json(ErrorResponse) ;
  }
}

async function destroyAirport(request , response){
//   console.log(request.params.id) ;
  try {
    const airport = await AirportService.destroyAirport(request.params.id) ;
    SuccessResponse.data = airport ;
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

async function updateAirport(req , res){
  try {
    const airport = await AirportService.updateAirport(req.params.id , {

    })
    SuccessResponse.data = airport ;
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
    createAirport ,
    getAirport,
    getAirport,
    destroyAirport,
    updateAirport
}