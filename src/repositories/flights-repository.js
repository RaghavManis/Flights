
const crudRepository = require('./crud-repositories') ; // the crud repository which we have created in this same folder , is going to work like
                                                        // a template for crud operations ..... and whenever we want to add some then we pass our
                                                        // model in that repo by this airplane repo 
const {Sequelize} = require('sequelize') ;
const db = require('../models') ;// we will use it for keeping lock 

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

    async get(id) {
        const response = await this.model.findByPk(id);
        if(!response){  //since response should be object if crud operation is working fine , but if not working fine then it will be nULL
            throw new AppError("the airplane you requested is not in my database" , StatusCodes.NOT_FOUND ) ;
        }
        return response;
    }

    async updateRemainingSeats(flightId , seats , dec = true){
        await db.sequelize.query(`SELECT * from flights WHERE flights.id = ${flightId} FOR UPDATE ;`) ; //The FOR UPDATE clause is crucial in this context. It locks the row(s) returned by the SELECT query for updating. In a transactional system (especially in concurrent environments), this ensures that no other transaction can modify or lock the same row(s) until the current transaction is completed.
                                                                                                        // This is often used to prevent race conditions in concurrent access scenarios, where multiple processes or users may be trying to update the same record at the same time. By locking the row, you ensure that one transaction fully completes before another transaction can make changes.
        const flight = await flights.findByPk(flightId) ;
        if (parseInt(dec)) {
            const response = await flight.decrement('totalSeats' , {by:seats}) ;
            return response ;
        } else {
            const response = await flight.increment('totalSeats' , {by:seats}) ;
            return response ;
        }
    }
} 

module.exports = FlightRepository ;



