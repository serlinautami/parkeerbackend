const router = require('express').Router()
const { authController, profileController, parkirControlller, userController } = require('../controllers/admin');
const { adminAuthMiddleware } = require('../middleware');

// admin route
router.post('/api/admin/login', authController.login);
// router.get('/api/admin/profile',adminAuthMiddleware,  profileController.get);

// // jenis parkir
// router.get('/api/admin/jenis-parkir', adminAuthMiddleware, parkirControlller.getJenisParkir);
// router.post('/api/admin/jenis-parkir', adminAuthMiddleware, parkirControlller.createJenisParkir);
// router.put('/api/admin/jenis-parkir/:id', adminAuthMiddleware, parkirControlller.updateJenisParkir);
// router.delete('/api/admin/jenis-parkir/:id', adminAuthMiddleware, parkirControlller.deleteJenisParkir);

// // user
// router.get('/api/admin/customer', adminAuthMiddleware, userController.get);

// // member admin
// router.get('/api/admin/member-admin', adminAuthMiddleware, userController.getMemberAdmin);
// router.post('/api/admin/member-admin', adminAuthMiddleware, userController.createMemberAdmin);


module.exports = router;