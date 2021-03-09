const router = require('express').Router()
const { authController, profileController } = require('../controllers')
const { authMiddleware } = require('../middleware');
const { appConfig } = require('../configs');


// index
router.get('/', (_req, res) => res.status(200).json({
  status: 1,
  message: 'Success'
}))

// autentikasi
router.post('/api/login', authController.login);
router.post('/api/registration', authController.registration);

// profile
router.get('/api/profile', authMiddleware, profileController.get);


module.exports = router;