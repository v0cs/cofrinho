const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const movimentacaoRoutes = require('./routes/movimentationRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', movimentacaoRoutes);
app.use('/api', userRoutes)
app.use('/api', historicoRoutes);

sequelize.sync();

module.exports = app;
