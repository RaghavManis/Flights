const {ErrorResponse , SuccessResponse} = require('../utills/common') ;
const {StatusCodes} = require('http-status-codes') ;
const AppError = require('../utills/errors/app-error');

const validateRequest = (req , res , next)=>{
    if(!req.body.name){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "city not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse) ;
    }
    next() ;
}


module.exports = {
    validateRequest
}