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
const {Sequelize} = require('sequelize') ;

const { flights , Airplane , Airport , City }  = require('../models') ;             // we importing the our table(model) so that we can pass it in the crud repo 

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
            

            // NOTE---> IF YOU NOTICE THEN WE HAVE JOINED TABLES IN MIGRATIONS FILE (AT DATABASE LEVEL) , BUT IN MODELS FILE WE HAVE ONLY JOINED BUT NOT MENTION THAT 
            // BY WHICH COLUMNS WE HAVE TO JOIN THE TABLES SO HERE IF WE ACCES WITHOUT ON PROPERTY THEN BY DEFAULT SEQUELIZE JOIN TABLE BY BOTH TABLES PRIMARY KEYS , 
            // THAT WE DON'T WANT SO WE HAVE TO MENTION SPECIFICALLY , AND HERE IS THE METHOD TO JOIN MANUALLY 
            include : [
            
            { 
                model: Airplane ,     // IF TABLES ARE JOIN BY BOTH PRIMARY KEY THEN THIS WILL WORK 
                required:true ,
                as:'airplaneDetail'
            } ,
            {
                model:Airport ,
                required : true ,
                as :'departureAirport' ,
                on:{                    // WE HAVE TO MENTION MANUALLY OF THERE IS SOMETHNG OTHER THAN THE NORMAL
                    col1:Sequelize.where(Sequelize.col("flights.departureAirportId") , "=" , Sequelize.col("departureAirport.code")) 
                },
                include:{
                    model:City , 
                    required:true
                }
            },
            { 
                model:Airport ,
                required : true ,
                as :'arrivalAirport' ,
                on:{
                    col1:Sequelize.where(Sequelize.col("flights.arrivalAirportId") , "=" , Sequelize.col("arrivalAirport.code")) 
                } ,
                include:{
                    model:City , 
                    required:true
                }
            }
        ]
            }) ;
        // console.log("type of response in flights repo in getAllFlights -->" + typeof response[1] + "----------") ;
        // console.log(response[0].id) ;
        
        return response ;
    }
} 

module.exports = FlightRepository ;



