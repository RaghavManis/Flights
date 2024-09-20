const {ErrorResponse , SuccessResponse} = require('../utills/common') ;
const {StatusCodes} = require('http-status-codes') ;
const AppError = require('../utills/errors/app-error');
const {compareTime} = require('../utills/helpers/date-time-helper') ;

const validateRequest = (req , res , next)=>{
    // console.log("inside flights middleware") ;
    let check = compareTime( req.body.departureTime ,req.body.arrivalTime) ;
        if(!check){
            ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING FLIGHTS SHEDULING TIME" ;
            ErrorResponse.error = new AppError ([ "sheduling of flight is wrong"] , StatusCodes.BAD_REQUEST) ;
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse) ;
        }
        // console.log(check) ;
    if(!req.body.flightNumber){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "flight number not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }

    if(!req.body.airplaneId){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "airplaneId not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    
    if(!req.body.departureAirportId){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "departureAirportId not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "arrivalAirportId not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    
    if(!req.body.arrivalTime){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "arrivalTime not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    
    if(!req.body.departureTime){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "departureTime not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    
    if(!req.body.price){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "price not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    
    if(!req.body.totalSeats){
        ErrorResponse.message = "SOMETHING WRONG IN THE INCOMING REQUEST" ;
        ErrorResponse.error = new AppError ([ "totalSeats not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse) ;
    }
    console.log("inside flights middleware in last") ;
    next() ;
}

async function validateUpdateSeatsRequest(req , res , next){
    if(!req.body.seats){
        ErrorResponse.message = "something wrong in incoming data for update in seats "
        ErrorResponse.error = new AppError ([ "number of seats not found in the incoming request"] , StatusCodes.BAD_REQUEST) ;
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse) ;
    }
    next() ;

}


module.exports = {
    validateRequest,
    validateUpdateSeatsRequest
}