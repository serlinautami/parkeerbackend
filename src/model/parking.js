const { DataTypes } = require('sequelize');
const database = require('../database');

const Parking = database.define('parkings', {
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  invoice: { type: DataTypes.STRING, allowNull: true },
  user_id: { type: DataTypes.STRING, allowNull: true },
  user_vehicle_id: { type: DataTypes.STRING, allowNull: true },
  parking_type_id: { type: DataTypes.STRING, allowNull: true },
  parking_in: { type: DataTypes.DATE, allowNull: true },
  parking_out: { type: DataTypes.DATE, allowNull: true },
  parking_fee: { type: DataTypes.INTEGER, allowNull: true },
  deleted: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
  status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = Parking;