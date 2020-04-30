const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user.model')

/** Создание */
module.exports.create = async (req, res) => {
  const candidate = await User.findOne({
    $or: [
      { login: req.body.login },
      { phone: +req.body.phone },
      { email: req.body.email }
    ]
  })

  if (candidate) {
    let param = ''
    if (candidate.login === req.body.login) {
      param = 'логин'
    } else if (candidate.phone === +req.body.phone) {
      param = 'номер телефона'
    } else if (candidate.email === req.body.email) {
      param = 'email'
    }
    res.status(409).json({ message: `Этот ${param} уже занят!` })
  } else {
    const salt = bcrypt.genSaltSync(new Date())
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt),
      fullname: req.body.fullname,
      email: req.body.email,
      description: req.body.description,
      phone: req.body.phone,
      active: req.body.active,
      role: req.body.role
    })
    await user.save()
    res.status(201).json({ message: 'Пользователь успешно создан!' })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  if (req.body.password && req.body.password !== '') {
    const salt = bcrypt.genSaltSync(new Date())
    $set.password = bcrypt.hashSync(req.body.password, salt)
  }
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    console.error('error', error)
    const msg = error.errmsg
    let param = ''
    if (msg.includes('$login')) {
      param = 'логин'
    } else if (msg.includes('$email')) {
      param = 'email'
    } else if (msg.includes('$phone')) {
      param = 'номер телефона'
    }
    res.status(409).json({
      message: `Этот ${param} уже занят!`,
      error
    })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Пользователь удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить пользователя!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      password: 0
    }).populate('role', { name: 1, access: 1 })
    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден!' })
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    req.status(500).json({ message: 'Не удалось достать пользователя!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 })
      .populate('role', { name: 1 })
      .sort({ created: -1 })
    // TODO агрегация
    // const total = await Role.find(query).countDocuments()
    res.json({ data: users })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список ролей!' })
  }
}

/** Сменить статус пользователя */
module.exports.switchStatus = async (req, res) => {
  const $set = req.body
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({
      message: `Не удалось ${
        req.body.active ? 'заблокировать' : 'разблокировать'
      } пользователя!`,
      error
    })
  }
}
