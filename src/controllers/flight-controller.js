const {StatusCodes} = require('http-status-codes') ;
const {FlightsService} = require('../services') ;
const {SuccessResponse , ErrorResponse} = require('../utills/common') ;
// const AppError = require('../utills/errors/app-error');
// controller me throw nhh krna hai , ye last point hai , yha se response hi return hoga always 
// second thing set the data here which you will pass in the model for creating entry


/**
 * POST : /cities
 * req-body {name : 'city_name'}
 */
async function createFlight(req , res){
    try {
        const flight = await FlightsService.createFlight({
            id : req.body.id ,
            price : req.body.price ,
            name : req.body.name ,
            destination : req.body.destination ,
            arrival : req.body.idarrival ,
            arivalTime : req.body.idarrivelTime ,
            departureTime : req.body.departureTime ,
        })
        SuccessResponse.data = flight ;
        SuccessResponse.message = "successfully created the flight" ;
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

async function destroyFlight(request , response){
    // console.log(request.params.id) ;
    try {
      const flight = await CityService.destroyFlight(request.params.id) ;
      SuccessResponse.data = flight ;
      SuccessResponse.message = "successfully deleted given flight " ;
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

   
async function updateFlight(req , res){
    try {
      const flight = await CityService.updateCity(req.params.id , {
            id : req.body.id ,
            price : req.body.price ,
            name : req.body.name ,
            destination : req.body.destination ,
            idarrival : req.body.idarrival ,
            idarrivelTime : req.body.idarrivelTime ,
            departureTime : req.body.departureTime ,
      })
      SuccessResponse.data = flight ;
      SuccessResponse.message = "succefully updated flight with given flight id" ;
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
    createFlight,
    destroyFlight,
    updateFlight
}