// const crudRepository = require('./crud-repositories') ; // the crud repository which we have created in this same folder , is going to work like
//                                                         // a template for crud operations ..... and whenever we want to add some then we pass our
//                                                         // model in that repo by this airplane repo 

// const { flights }  = require('../models/flights') ;             // we importing the our table(model) so that we can pass it in the crud repo 

// class FlightsRepository extends crudRepository{
//     constructor(){
//         super(flights) ; // paassing our model to parent class
//         console.log("inside the constructor of flights-repository .js") ;
//     }
// }

// module.exports = FlightsRepository ;

////////////////////////////////////////////////////////////////////////////////////////////////////////

const crudRepository = require('./crud-repositories') ; // the crud repository which we have created in this same folder , is going to work like
                                                        // a template for crud operations ..... and whenever we want to add some then we pass our
                                                        // model in that repo by this airplane repo 

const { flights }  = require('../models') ;             // we importing the our table(model) so that we can pass it in the crud repo 

class FlightRepository extends crudRepository{
    constructor(){
        // console.log("inside the constructor of airplane-repository .js") ;
        super(flights) ; // paassing our model to parent class
    }

    async getAllFlights(filter , sort){  // ittee me ho gya filtering ka logic 
        const response = await flights.findAll({
            where:filter ,  
            order:sort , 
            // The order option takes an array of items to order the query by or a sequelize method. These items are
            // themselves arrays in the form [column, direction]. The column will be escaped correctly and the 
            // direction will be checked in a whitelist of valid directions (such as ASC, DESC, NULLS FIRST, etc).
        })
        return response ;
    }
} 

module.exports = FlightRepository ;



