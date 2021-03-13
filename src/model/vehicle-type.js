const { DataTypes } = require('sequelize');
const database = require('../database');

const VehicleType = database.define('vehicle_types', {
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: true},
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1},
  deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})


module.exports = VehicleType;