const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Manuals = sequelize.define('Manuals', {
    serialNumber:{
     type: DataTypes.STRING,
     allowNull: false,
     unique: true
   },
   userManual: {
     type: DataTypes.STRING,
     allowNull: true
   },
   serviceManual: {
    type: DataTypes.STRING,
    allowNull: true
  },  
   
 
 });

 module.exports = Manuals;