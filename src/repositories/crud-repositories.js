const { Logger } = require('../config');
const AppError = require('../utills/errors/app-error');
const {StatusCodes} = require('http-status-codes') ;

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    // Create a new record
    async create(data) {
        // try {    // since whatever the error is going from here we are handling that in service folder so why we handle error here 
                    // similarly we will remove all try catch block from all crud operations 
                    console.log("gsdfwcje") ;
            const response = await this.model.create(data);
            return response;
        // } catch (error) {
        //     Logger.error("Something went wrong in the Crud : create", error);
        //     throw error;
        // }
    } 

    // Delete a record by ID 
    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id
            }
        });
        if(!response){
            throw new AppError("airplane you requested for deleting is not on the database" , StatusCodes.NOT_FOUND) ;
        }
        return response;
    }

    // Get a record by ID
    async get(id) {
        const response = await this.model.findByPk(id);
        if(!response){  //since response should be object if crud operation is working fine , but if not working fine then it will be nULL
            throw new AppError("the airplane you requested is not in my database" , StatusCodes.NOT_FOUND ) ;
        }
        return response;
    }

    // Get all records
    async getAll() {
        const response = await this.model.findAll(); // Typically, findAll is used
        return response;
    }

    // Update a record by ID
    async update(id, data) { 
        const [updatedRows] = await this.model.update(data, {
            where: {
                id: id
            }
        });
        
        if (updatedRows === 0) {
            // If no rows were updated, throw a NOT FOUND error
            throw new AppError("The data you want to update is not present in the database", StatusCodes.NOT_FOUND);
        }
    
        // Fetch the updated airplane and return it
        const updatedData = await this.model.findByPk(id);
        return updatedData;
    }
}

module.exports = CrudRepository;
