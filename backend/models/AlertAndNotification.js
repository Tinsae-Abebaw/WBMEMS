// models/Announcement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const AlertAndNotification = sequelize.define('AlertAndNotification', {
  NotificationType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  readStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull:false
  }
});

module.exports = AlertAndNotification;
