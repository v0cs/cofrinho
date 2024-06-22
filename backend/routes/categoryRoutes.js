const express = require('express');
const router = express.Router();
const { createCategory, getCategories, deleteCategory, updateCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/categories', authMiddleware, createCategory);
router.get('/categories', authMiddleware, getCategories);
router.delete('/categories/:id', authMiddleware, deleteCategory);
router.put('/categories/:id', authMiddleware, updateCategory);

module.exports = router;
