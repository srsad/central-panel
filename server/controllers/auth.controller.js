require('dotenv').config()
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Session = require('../models/session.model')

module.exports.login = async (req, res) => {
  try {
    const candidate = await User.findOne({
      login: req.body.login
    }).populate('role', { access: 1 })

    if (!candidate.active) {
      res.status(403).json({ message: 'Вы заблокированы администратором!' })
    }

    if (candidate) {
      // проверка пароля
      const isCorrect = bcrypt.compareSync(
        req.body.password,
        candidate.password
      )
      if (isCorrect === true) {
        const token = jwt.sign(
          {
            userId: candidate._id,
            login: candidate.login,
            roleId: candidate.role._id,
            fingerprint: req.body.fingerprint
          },
          process.env.JWT,
          // секунды * минуты * часы * дни
          // { expiresIn: 60 * 60 * 24 * 2 }
          // { expiresIn: 60 * 20 }
          { expiresIn: 20 }
        )

        const session = new Session({
          user_id: candidate._id,
          fingerprint: req.body.fingerprint,
          os: req.body.os,
          browser: req.body.browser,
          expired: new Date(new Date().getTime() + 60000),
          // expired: new Date(new Date().getTime() + 60000),
          token
        })
        await session.save()

        // в качестве refreshToken будет id записи в таблице сессий
        const user = JSON.parse(JSON.stringify(candidate))
        delete user.password
        res.status(200).json({ token, refreshToken: session._id, user })
      } else {
        res.status(404).json({ message: 'Неверный логин или пароль' })
      }
    } else {
      // Пользователь не найден
      res.status(404).json({ message: 'Неверный логин или пароль' })
    }
  } catch (error) {
    console.error(
      'auth.controller - login. Неудачная попытка авторизации.',
      error
    )
    res.status(404).json({ message: 'Неудачная попытка авторизации' })
  }
}
