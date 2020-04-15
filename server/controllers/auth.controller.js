require('dotenv').config()
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    // проверка пароля
    const isCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    if (isCorrect === true) {
      const token = jwt.sign(
        {
          userId: candidate._id,
          login: candidate.login,
          roleId: candidate.role
          // fingerprint: req.body.fingerprint
        },
        process.env.JWT,
        // секунды * минуты * часы * дни
        // { expiresIn: 60 * 60 * 24 * 2 }
        { expiresIn: 60 * 20 }
      )

      const refreshToken = jwt.sign(
        {
          userId: candidate._id,
          login: candidate.login,
          roleId: candidate.role
          // fingerprint: req.body.fingerprint
        },
        process.env.JWT,
        { expiresIn: 60 * 60 }
      )

      res.status(200).json({ token, refreshToken })
    } else {
      res.status(401).json({ message: 'Неверный логин или пароль' })
    }
  } else {
    // Пользователь не найден
    res.status(404).json({ message: 'Неверный логин или пароль' })
  }
}
