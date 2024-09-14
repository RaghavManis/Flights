const {Sequelize} = require('sequelize') ;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane , { // be cautious with the name model , it should be same as the class name in the corresponding model
        foreignKey:'airplaneId', // this must be same in both , in belongs to wali file and has many files 
        as : 'airplaneDetail' //since we are using multiple belongs to so it chances of cunfusion for the sequelize,so it will better if give name for all of them as alias
      });
      this.belongsTo(models.Airport , {
        foreignKey:'departureAirportId',
        as :  'departureAirport',
      });
      this.belongsTo(models.Airport , {
        foreignKey:'arrivalAirportId' ,
        as :  'arrivalAirport' 
      })
    }
  }
  flights.init({
    flightNumber:{
      type:DataTypes.STRING,
      allowNull:false
    } ,
    airplaneId:{
      type:DataTypes.INTEGER,
      allowNull:false
    } ,
    departureAirportId:{
      type:DataTypes.STRING,
      allowNull:false
    },
    arrivalAirportId:{
      type:DataTypes.STRING,
      allowNull:false
    } ,
    arrivalTime:{
      type:DataTypes.DATE,
      allowNull:false
    } ,
    departureTime:{
      type:DataTypes.DATE,
      allowNull:false
    } ,
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    boardingGate:{
      type:DataTypes.STRING,
      // allowNull:false
    },
    totalSeats:{
      type:DataTypes.INTEGER,
      allowNull:false
    } 
  }, {
    sequelize,
    modelName: 'flights',
  });
  return flights;
};