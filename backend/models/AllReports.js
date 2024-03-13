const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AllReports = sequelize.define('AllReports', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  equipmentName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  equipmentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reportType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  requestedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  doneBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  maintenanceDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tasksPerformed: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  repair: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  natureOfBreakage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  replacement: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  majorComplaint: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  visualInspection: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  visibleDamageBefore: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  environmentalConditions: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  referenceStandards: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  proceduresDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  adjustmentsMade: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  adjustments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deviationFromStandard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  correctiveAction: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calibrationResultsSummary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accessoriesPresent: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  modificationsDuringInstallation: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  adjustmentsMadeDuringInstallation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  challengesOrIssuesEncountered: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  issuesAddressed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  safetyStandardsCompliance: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  replacedSparePart: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  replacementCostInETB: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  verifyFunctionality: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  complianceWithGuidelines: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  durationInHours: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  recommendation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  
  reportDate:{
    type:DataTypes.STRING,
    allowNull:true,
  }

});

module.exports = AllReports;
