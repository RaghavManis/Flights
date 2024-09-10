'use strict';
const { Op } = require('sequelize') ;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Airplanes' , [   // use for inserting the initial data in the seeders folder 
    {
      modelNumber:"seeder_airbus340",
      capacity:220 ,
      createdAt: new Date() ,
      updatedAt:new Date()
    } ,
    {
      modelNumber:"seeder_airbus341",
      capacity:221 ,
      createdAt: new Date() ,
      updatedAt:new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */                                                            // use for undo the data which where recently inserted
    await queryInterface.bulkDelete('Airplanes' , {[Op.or] : [{modelNumber:"seeder_airbus341"} , {modelNumber:"seeder_airbus340"}]}) ;
  }
};
