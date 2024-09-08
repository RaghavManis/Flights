const {StatusCodes} = require('http-status-codes') ;
const {CityService} = require('../services') ;
const {SuccessResponse , ErrorResponse} = require('../utills/common') ;
const AppError = require('../utills/errors/app-error');
// controller me throw nhh krna hai , ye last point hai , yha se response hi return hoga always 
// second thing set the data here which you will pass in the model for creating entry


/**
 * POST : /cities
 * req-body {name : 'city_name'}
 */
async function createCity(req , res){
    try {
        const city = await CityService.createCity({
            name : req.body.name 
        })
        SuccessResponse.data = city ;
        SuccessResponse.message = "successfully created the city" ;
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

module.exports = {
    createCity
}