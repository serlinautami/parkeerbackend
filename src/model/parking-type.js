const { DataTypes } = require('sequelize');
const database = require('../database');

const ParkingType = database.define('parking_types', {
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: true, unique: true },
  fee: { type: DataTypes.INTEGER, allowNull: true },
  active: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 1 },
  deleted: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = ParkingType;