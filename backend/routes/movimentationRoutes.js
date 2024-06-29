const express = require('express');
const router = express.Router();
const { createMovimentation, getMovimentation, deleteMovimentation, updateMovimentation } = require('../controllers/movimentationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/movimentation', authMiddleware, createMovimentation);
router.get('/movimentation', authMiddleware, getMovimentation);
router.delete('/movimentation/:id', authMiddleware, deleteMovimentation);
router.put('/movimentation/:id', authMiddleware, updateMovimentation);

module.exports = router;
