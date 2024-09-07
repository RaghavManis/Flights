const { Logger } = require('../config');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    // Create a new record
    async create(data) {
        // try {
            const response = await this.model.create(data);
            return response;
        // } catch (error) {
        //     Logger.error("Something went wrong in the Crud : create", error);
        //     throw error;
        // }
    }

    // Delete a record by ID 
    async destroy(id) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the Crud : destroy", error);
            throw error;
        }
    }

    // Get a record by ID
    async get(id) {
        try {
            const response = await this.model.findByPk(id);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the Crud : get", error);
            throw error;
        }
    }

    // Get all records
    async getAll() {
        try {
            const response = await this.model.findAll(); // Typically, findAll is used
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the Crud : getAll", error);
            throw error;
        }
    }

    // Update a record by ID
    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the Crud : update", error);
            throw error;
        }
    }
}

module.exports = CrudRepository;
