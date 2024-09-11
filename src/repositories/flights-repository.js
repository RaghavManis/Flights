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
}

module.exports = FlightRepository ;



