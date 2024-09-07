const {AirplaneService} = require('../services') ;
const {StatusCodes} = require('http-status-codes') ;
// const { createAirplane } = require('../services/airplane-service');

async function createAirplane(req , res){
    try {
      const airplane = await AirplaneService.createAirplane({
        modelNumber: req.body.modelNumber ,
        capacity: req.body.capacity
      });
      console.log("inside try block of controller");
        return res.status(StatusCodes.CREATED)
                  .json({
                    success:true ,
                    message:"successfully create an airplane",
                    data:airplane ,
                    error:{}
                  })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json({
                    success:false ,
                    message:"something went wrong while creating the airplane",
                    error:error
                  })
    }
}

module.exports = {
    createAirplane
}