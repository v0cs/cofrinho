const Movimentation = require('../models/movimentation');
const Category = require('../models/category');
const { Op } = require('sequelize');

exports.getHistorico = async (req, res) => {
  const { dataInicio, dataFim, categoriaId } = req.query;
  const userId = req.user;

  try {
    const whereCondition = {
      usuario_id: userId,
    };

    if (dataInicio && dataFim) {
      whereCondition.data = {
        [Op.between]: [dataInicio, dataFim],
      };
    }

    if (categoriaId) {
      whereCondition.categoria_id = categoriaId;
    }

    const historico = await Movimentation.findAll({
      where: whereCondition,
      include: [{ model: Category }],
    });

    res.json(historico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
