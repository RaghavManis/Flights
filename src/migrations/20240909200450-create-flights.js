'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull:false
      },
      airplaneId: {  // way of adding two tables while creating the table in migtration , this is the second way of adding , first way is by creating another migrations
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:'Airplanes',
            key:'id'
        },
        onDelete:'CASCADE'
      },
      departureAirportId: {
        // type: Sequelize.INTEGER, // IF YOU ARE GOING TO MAKE THIS FOREIGN KEY THEN MAKE SURE THAT BOTH THE COLUMN OF TABLES HAVING SAME DATATYPE
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          // table:'Airports', // WHEN YOU ARE DOING ASSOCIATION IN MIGRATION WHILE CREATING THE MODEL THEN YOU HAVE TO USE MODEL AND KEY IN PLACE OF THE TABLE AND FIELD RESPECTIVILY
          // field:'code'
          model:'Airports',
          key:'code'
      },
      onDelete:'CASCADE'
      },
      arrivalAirportId: {
        // type: Sequelize.INTEGER, // IF YOU ARE GOING TO MAKE THIS FOREIGN KEY THEN MAKE SURE THAT BOTH THE COLUMN OF TABLES HAVING SAME DATATYPE
        type: Sequelize.STRING, 
        references:{
          // table:'Airports', // WHEN YOU ARE DOING ASSOCIATION IN MIGRATION WHILE CREATING THE MODEL THEN YOU HAVE TO USE MODEL AND KEY IN PLACE OF THE TABLE AND FIELD RESPECTIVILY
          // field:'code'
          model:'Airports',
          key:'code'
      },
      onDelete:'CASCADE'
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull:false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flights');
  }
};