// models/Contract.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Contract = sequelize.define('Contract', {
  healthcareFacility: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  supplierManufacturer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  supplierManufacturerAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  supplierManufacturerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  supplierManufacturerEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agreementDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  supplierContact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  equipmentName: {
    type: DataTypes.TEXT,
    allowNull:true,
  },
  equipmentModel: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contractDuration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  terminationConditions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serviceLevelExpectations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  performanceMetrics: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  costBreakdown: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentSchedule: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentTerms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  warrantyTerms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  liabilityLimitations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  defectHandlingProcedures: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Contract;