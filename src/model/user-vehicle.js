const { DataTypes } = require('sequelize');
const database = require('../database');

const UserVehicle = database.define('user_vehicles', {
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  plate: { type: DataTypes.STRING, allowNull: null },
  user_id: { type: DataTypes.STRING, allowNull: null },
  vehicle_type_id: { type: DataTypes.STRING, allowNull: null },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = UserVehicle;