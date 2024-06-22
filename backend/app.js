const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);

sequelize.sync();

module.exports = app;
