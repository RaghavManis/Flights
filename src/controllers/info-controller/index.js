const { StatusCodes } = require('http-status-codes') ; // in statusCodes starting s must be capital , since it is object coming from the 
                                                       // 'http-status-codes'  so the name should as it is as defined
const info = (request , response)=>{
    // return response.json({   // if we just do this, and if look at the response code in postman then the code is not up to the mark 
                                // for setting the code according to our requirement we import the http-status-code and use the .status() function 
                                // of the response object 
        return response.status(StatusCodes.OK).json({ 
        success:true ,
        message : "api is working, we are on path = /api/v1/info",
        data:{},
        error:{}
    })
}

module.exports = {
    info
}