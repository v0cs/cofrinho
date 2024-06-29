const Movimentation = require('../models/movimentation');
const User = require('../models/user');
const Category = require('../models/category');

exports.createMovimentation = async (req, res) => {
  const { tipo, descricao, data, valor, categoria_id } = req.body;
  const userId = req.user;

  try {
    const movimentation = await Movimentation.create({
      tipo,
      descricao,
      data,
      valor,
      usuario_id: userId,
      categoria_id,
    });
    res.status(201).json(movimentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMovimentation = async (req, res) => {
  const userId = req.user;

  try {
    const movimentation = await Movimentation.findAll({
      where: { usuario_id: userId },
      include: [{ model: Category }],
    });
    res.json(movimentation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMovimentation = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  try {
    const result = await Movimentation.destroy({ where: { id, usuario_id: userId } });
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Movimentação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMovimentation = async (req, res) => {
  const { id } = req.params;
  const { tipo, descricao, data, valor, categoria_id } = req.body;
  const userId = req.user;

  try {
    const movimentation = await Movimentation.findOne({ where: { id, usuario_id: userId } });
    if (movimentation) {
      movimentation.tipo = tipo;
      movimentation.descricao = descricao;
      movimentation.data = data;
      movimentation.valor = valor;
      movimentation.categoria_id = categoria_id;
      await movimentation.save();
      res.json(movimentation);
    } else {
      res.status(404).json({ error: 'Movimentação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
