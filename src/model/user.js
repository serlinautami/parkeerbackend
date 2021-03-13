const { DataTypes }  = require('sequelize');
const database = require('../database');


const User = database.define('users', {
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.TEXT, allowNull: true },
  photo: { type: DataTypes.TEXT, allowNull: true },
  dob: { type: DataTypes.DATE, allowNull: true },
  access_token: { type: DataTypes.TEXT, allowNull: true },
  role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'customer' }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})


module.exports = User;