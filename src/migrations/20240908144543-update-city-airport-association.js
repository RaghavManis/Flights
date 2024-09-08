'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // here in this .addconstarints we are passing two objects , one is table in which we have to make a foreign key and other will have the 
    // details of the constraints which we are going to make 
    await queryInterface.addConstraint('Airports' , {   
      type:'FOREIGN KEY',    // type of constarints which we wwant to make , here we want cityId as the foreign key
      name:'city_fkey_constraint',  // give a virtual name to that constraint which you are making 
      fields:['cityId'],     // here pass the colunm on which you want to do apply the constraint
      references:{           // here we will pass refrences , from which table and of which colunm of that table we are going to corelate
        table:'Cities',      // table_name of referencing table
        field:'id'           // colunm_name of that referencing table
      },
      onUpdate:'CASCADE',    // adding extra properties to the constraint that whenever we update primary key details then all related data will be updated 
      onDelete:'CASCADE'     // similarly on deletion of primary key all related data will be deletd
    }) ;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports' ,'city_fkey_constraint' ) ;  // way to derefrence the constraints....passing two arguments
                                                                                  // only one is table name in which foreign key is and other is 
                                                                                  // name of constarint which you havset manually
  }
};
