'use strict';
const {
  Model,
  ENUM
} = require('sequelize');
const {Enums} = require('../utills/common') ;
const {BUSINESS, ECONOMY , PREMIUM_ECONOMY , FIRST_CLASS} = Enums.SEATTYPE ;
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane , { // be cautious with the name model , it should be same as the class name in the corresponding model
        foreignKey:'airplaneId', // this must be same in both , in belongs to wali file and has many files 
        // as : 'airplaneDetail' //since we are using multiple belongs to so it chances of cunfusion for the sequelize,so it will better if give name for all of them as alias
      });
    }
  }
  Seat.init({
    airplaneId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    row:{
      type:DataTypes.STRING ,
      allowNull:false
    } ,
    col:{
      type:DataTypes.STRING,
      allowNull:false
    } ,
    type:{
      type:DataTypes.ENUM ,
      values:[BUSINESS , ECONOMY , PREMIUM_ECONOMY , FIRST_CLASS] ,
      defaultValue:ECONOMY
    } ,
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};