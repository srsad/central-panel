require('dotenv').config()
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  console.log('candidate', candidate)
  if (candidate) {
    // проверка пароля
    const isCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    if (isCorrect === true) {
      const token = jwt.sign(
        {
          userId: candidate._id,
          login: candidate.login
        },
        process.env.JWT,
        // секунды * минуты * часы * дни
        { expiresIn: 60 * 60 * 24 * 2 }
      )

      res.status(200).json({
        token,
        userId: candidate._id
        // role: candidate.role
      })
    } else {
      res.status(401).json({ message: 'Неверный логин или пароль' })
    }
  } else {
    // Пользователь не найден
    res.status(404).json({ message: 'Неверный логин или пароль' })
  }
}
