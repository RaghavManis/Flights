const crudRepository = require('./crud-repositories') ; // the crud repository which we have created in this same folder , is going to work like
                                                        // a template for crud operations ..... and whenever we want to add some then we pass our
                                                        // model in that repo by this airplane repo 

const { Flights }  = require('../models') ;             // we importing the our table(model) so that we can pass it in the crud repo 

class FlightsRepository extends crudRepository{
    constructor(){
        // console.log("inside the constructor of flights-repository .js") ;
        super(Flights) ; // paassing our model to parent class
    }
}

module.exports = FlightsRepository ;