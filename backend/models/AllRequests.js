const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Requests = sequelize.define('allRequestses', {
  equipmentName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  equipmentType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Model: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  calibrationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  calibrationType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  calibrationDueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  installationSpecification: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  installationDueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  installationDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  maintenanceIssue: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  maintenancePriority: {
    type: DataTypes.STRING,
    allowNull: true
  },
  maintenanceDueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
 
  procurementSpecification: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  procurementReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  specificationDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  specificationDueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  traineeType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainingLevel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainingDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  trainingDuration: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  
  requestType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Pending'
  },
  action:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'None'

  },
  requestDate:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  requestedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },




  
});

module.exports = Requests;