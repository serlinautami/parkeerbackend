const router = require('express').Router()
const { authController, profileController, parkirControlller } = require('../controllers/admin');
const { adminAuthMiddleware } = require('../middleware');

// admin route
router.post('/api/admin/login', authController.login);
router.get('/api/admin/profile',adminAuthMiddleware,  profileController.get);

// jenis parkir
router.get('/api/admin/jenis-parkir', adminAuthMiddleware, parkirControlller.getJenisParkir);
router.post('/api/admin/jenis-parkir', adminAuthMiddleware, parkirControlller.createJenisParkir);


module.exports = router;