const User = require('./user');
const Notification = require('./notification');
const VehicleType = require('./vehicle-type');
const ParkingType = require('./parking-type');
const ParkingVehicleList  = require('./parking-vehicle-list');
const UserVehicle  = require('./user-vehicle');
const Parking  = require('./parking');

// relations
ParkingType.hasMany(ParkingVehicleList, { foreignKey: 'parking_type_id' });
VehicleType.hasMany(ParkingVehicleList, { foreignKey: 'vehicle_type_id' });
ParkingVehicleList.belongsTo(ParkingType, { foreignKey: 'parking_type_id' });
ParkingVehicleList.belongsTo(VehicleType, { foreignKey: 'vehicle_type_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
User.hasMany(UserVehicle, { foreignKey: 'user_id' });
User.hasMany(Parking, { foreignKey: 'user_id' });

VehicleType.belongsTo(UserVehicle, { foreignKey: 'vehicle_type_id'});
ParkingType.belongsTo(Parking, { foreignKey: 'parking_type' });
Parking.belongsTo(UserVehicle, { foreignKey: 'user_vehicle_id' });





module.exports = {
  User,
  Parking,
  VehicleType,
  Notification,
  ParkingType,
  UserVehicle,
  ParkingVehicleList
}