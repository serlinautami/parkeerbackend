const router = require('express').Router()
const { authController, profileController } = require('../controllers/customer');
const { customerAuthMiddleware } = require('../middleware');

router.post('/api/customer/login', authController.login);
router.post('/api/customer/registration', authController.registration);
router.get('/api/customer/profile', customerAuthMiddleware, profileController.get);


module.exports = router;