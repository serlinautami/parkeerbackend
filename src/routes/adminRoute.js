const router = require('express').Router()
const { 
  authController, 
  profileController, 
  vehicleTypeController,
  parkingTypeController,
  userController 
} = require('../controllers/admin');
const { adminAuthMiddleware, superAdminAuthMiddleware } = require('../middleware');

// admin route
router.post('/api/admin/login', authController.login);
router.get('/api/admin/profile',adminAuthMiddleware,  profileController.get);

// // jenis parkir
// router.get('/api/admin/jenis-parkir', adminAuthMiddleware, parkirControlller.getJenisParkir);
// router.post('/api/admin/jenis-parkir', adminAuthMiddleware, parkirControlller.createJenisParkir);
// router.put('/api/admin/jenis-parkir/:id', adminAuthMiddleware, parkirControlller.updateJenisParkir);
// router.delete('/api/admin/jenis-parkir/:id', adminAuthMiddleware, parkirControlller.deleteJenisParkir);

// customer
router.get('/api/admin/customer', adminAuthMiddleware, userController.getCustomer);

// // member admin
router.get('/api/admin/member-admin', adminAuthMiddleware, userController.getMemberAdmin);
router.post('/api/admin/member-admin', adminAuthMiddleware, userController.createMemberAdmin);
router.put('/api/admin/member-admin/:id/reset-password', superAdminAuthMiddleware, userController.resetPassword);
router.delete('/api/admin/member-admin/:id', superAdminAuthMiddleware, userController.removeMemberAdmin);


// jenis kendaraan
router.get('/api/admin/vehicle-type', adminAuthMiddleware, vehicleTypeController.get);
router.post('/api/admin/vehicle-type', adminAuthMiddleware, vehicleTypeController.create);
router.put('/api/admin/vehicle-type/:id', adminAuthMiddleware, vehicleTypeController.update);
router.delete('/api/admin/vehicle-type/:id', adminAuthMiddleware, vehicleTypeController.remove);

// jenis parkir
router.get('/api/admin/parking-type', adminAuthMiddleware, parkingTypeController.get);
router.post('/api/admin/parking-type', adminAuthMiddleware, parkingTypeController.create);
router.put('/api/admin/parking-type/:id', adminAuthMiddleware, parkingTypeController.update);
router.delete('/api/admin/parking-type/:id', adminAuthMiddleware, parkingTypeController.remove);



// backdoor
router.post('/api/backdoor/superadmin', userController.createSuperAdmin);


module.exports = router;