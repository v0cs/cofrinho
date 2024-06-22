const Category = require('../models/category');
const User = require('../models/user');

exports.createCategory = async (req, res) => {
  const { nome } = req.body;
  const userId = req.user;

  try {
    const category = await Category.create({ nome, usuario_id: userId });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  const userId = req.user;

  try {
    const categories = await Category.findAll({ where: { usuario_id: userId } });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  try {
    const result = await Category.destroy({ where: { id, usuario_id: userId } });
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const userId = req.user;

  try {
    const category = await Category.findOne({ where: { id, usuario_id: userId } });
    if (category) {
      category.nome = nome;
      await category.save();
      res.json(category);
    } else {
      res.status(404).json({ error: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
