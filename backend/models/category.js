const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Category = sequelize.define('Category', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Category.belongsTo(User, { foreignKey: 'usuario_id' });
User.hasMany(Category, { foreignKey: 'usuario_id' });

module.exports = Category;
