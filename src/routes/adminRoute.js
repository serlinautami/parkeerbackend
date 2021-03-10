const router = require('express').Router()
const { authController, profileController } = require('../controllers/admin');

// admin route
router.post('/api/admin/login', authController.login);
router.post('/api/admin/profile', profileController.get);


module.exports = router;