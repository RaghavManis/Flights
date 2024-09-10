'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // OUR ASSUMPTION : AIRPORT BELONGS TO A CITY --> SO IN AIRPORT WE USE THIS.BELONGSTO AND IN CITY WE WILL USE THIS.HASMANY , AND FOREIGHNKEY WILL BE SAME IN BOTH , AND THAT WILL BE CHOOSEN FORM THE THIS.BELONGS FILE
                       // AIRPORT HASMANY FLIGHTS ; SO WE ARE USING THIS.HASMANY HERE AND WILL USE THIS.BELONGS TO IN FLIGHTS
      // define association here
      this.belongsTo(models.City,{  // SETTING UP THE DETAILS AT THE JS LEVEL 
        foreignKey:'cityId',   // AIRPORT KEY WHICH IS POINTING TIO THE PRIMARY KEY OF CITY 
        onDelete:'CASCADE' ,   // ADDING EXTRA FEATURES 
        // onUpdate:'CASCADE'
      })
      this.hasMany(models.flights , {
        foreignKey:'departureAirportId' ,
        onDelete:'CASCADE'
      })
      this.hasMany(models.flights , {
        foreignKey:'arrivalAirportId' ,
        onDelete:'CASCADE'
      })

    }
  }
  Airport.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    } , 
    code:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    address:{
      type:DataTypes.STRING,
      // allowNull:false,
      unique:true
    },
    cityId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      // unique:true
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};