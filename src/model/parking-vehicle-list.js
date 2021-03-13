const { DataTypes } = require('sequelize');
const database = require('../database');

const ParkingVehicleList = database.define('parking_vehicle_lists', {
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  vehicle_type_id: { type: DataTypes.STRING, allowNull: true},
  parking_type_id: { type: DataTypes.STRING, allowNull: true},
}, {
  timestamps: false,
})

module.exports = ParkingVehicleList;