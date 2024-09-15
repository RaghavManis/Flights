'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.hasMany(models.flights , {
          foreignKey:'airplaneId',
          onDelete:'CASCADE' // this property implies that if a airplane is deleted then all related flights will be deleted 
        })
        this.hasMany(models.Seat , {
          foreignKey:'airplaneId',
          onDelete:'CASCADE' // this property implies that if a airplane is deleted then all related flights will be deleted 
        })
    }
  }
  Airplane.init({
    // modelNumber:DataTypes.STRING  // initiallt by default it is come with like this , but we can modify according to our demand
    modelNumber: {
      type:DataTypes.STRING,
      allowNull:false
    },
    capacity:{
      type:DataTypes.INTEGER,
      allowNull:false ,
      defaultValue : 0 ,
      validate:{
        max : 1000
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane', // it's the name of table which we have set during the command
  });
  return Airplane;
};