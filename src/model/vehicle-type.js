const { DataTypes } = require('sequelize');
const database = require('../database');

const VehicleType = database.define('vehicle_types', {
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: true, unique: true},
  deleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})


module.exports = VehicleType;