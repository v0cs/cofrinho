const express = require('express');
const router = express.Router();
const { getHistorico } = require('../controllers/historicoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/historico', authMiddleware, getHistorico);

module.exports = router;
