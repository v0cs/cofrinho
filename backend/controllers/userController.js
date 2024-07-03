const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findByPk(userId, { attributes: ['email'] });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ senha: hashedPassword }, { where: { id: userId } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUserAccount = async (req, res) => {
  const userId = req.user;

  try {
    await User.destroy({ where: { id: userId } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
