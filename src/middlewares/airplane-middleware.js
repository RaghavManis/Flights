const {StatusCodes} = require('http-status-codes') ;
const {ErrorResponse} = require('../utills/common') ;
const AppError = require('../utills/errors/app-error');
const validateRequest = (request , response , next)=>{
    if(!request.body.modelNumber){
        // console.log("insede validate request in airplane-middleware,js") ;
        ErrorResponse.message = "something went wrong while creating airplane " ;
        ErrorResponse.error = new AppError ([ "model number not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        // ErrorResponse.error = {explanation : "model number not found in the incoming request"} ;
        return response
                        .status(StatusCodes.BAD_REQUEST)
                        .json(ErrorResponse) ;
        
        // .....................INSTEAD OF DOING THIS WHOLE THING AGAIN AND AGAIN AT EVERY PLACE JUST DO LIKE THE UPPER THREE LINES........................
        // return response
        //             .status(StatusCodes.BAD_REQUEST)
        //             .json({
        //     success:false ,
        //     message:"something is wrong on the body request side ",
        //     data:{},
        //     error:{explanation : "model number not found in the incoming request"}
        // })
    }
    next() ;
}

module.exports = {
    validateRequest
}