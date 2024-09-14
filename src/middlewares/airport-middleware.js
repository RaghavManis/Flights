const {StatusCodes} = require('http-status-codes') ;
const {ErrorResponse} = require('../utills/common') ;
const AppError = require('../utills/errors/app-error');
const validateRequest = (request , response , next)=>{
    if(!request.body.name){
        // console.log("insede validate request in airplane-middleware,js") ;
        ErrorResponse.message = "something went wrong while creating airport " ;
        ErrorResponse.error = new AppError ([ "name not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return response
                        .status(StatusCodes.BAD_REQUEST)
                        .json(ErrorResponse) ;
    }

    if(!request.body.code){
        // console.log("insede validate request in airplane-middleware,js") ;
        ErrorResponse.message = "something went wrong while creating airport " ;
        ErrorResponse.error = new AppError ([ "code not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return response
                        .status(StatusCodes.BAD_REQUEST)
                        .json(ErrorResponse) ;
    }
    if(!request.body.cityId){
        // console.log("insede validate request in airplane-middleware,js") ;
        ErrorResponse.message = "something went wrong while creating airport " ;
        ErrorResponse.error = new AppError ([ "cityId not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return response
                        .status(StatusCodes.BAD_REQUEST)
                        .json(ErrorResponse) ;
    }
    console.log("middleware of airport is correctly checked ") ;
    next() ;
}

module.exports = {
    validateRequest
}