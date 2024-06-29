const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const movimentationRoutes = require('./routes/movimentationRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', movimentationRoutes);

sequelize.sync();

module.exports = app;
