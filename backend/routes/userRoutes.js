const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserPassword, deleteUserAccount } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile/password', authMiddleware, updateUserPassword);
router.delete('/profile', authMiddleware, deleteUserAccount);

module.exports = router;
