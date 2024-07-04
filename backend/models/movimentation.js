// models/movimentation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Category = require('./category');

const Movimentation = sequelize.define('Movimentation', {
  tipo: {
    type: DataTypes.ENUM('Despesa', 'Receita'),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
});

Movimentation.prototype.updateMovimentation = async function (updates) {
  Object.keys(updates).forEach(key => {
    this[key] = updates[key];
  });
  await this.save();
};

Movimentation.belongsTo(User, { foreignKey: 'usuario_id' });
User.hasMany(Movimentation, { foreignKey: 'usuario_id' });

Movimentation.belongsTo(Category, { foreignKey: 'categoria_id' });
Category.hasMany(Movimentation, { foreignKey: 'categoria_id' });

module.exports = Movimentation;
