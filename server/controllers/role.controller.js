const Role = require('../models/role.model')

/** Создание */
module.exports.create = async (req, res) => {
  const candidate = await Role.findOne({
    name: req.body.name
  })
  if (candidate) {
    res.status(409).json({ message: 'Роль с таким именем уже существует!' })
    return
  }

  try {
    const role = new Role({ ...req.body })
    role.save()
    res.status(201).json({ message: 'Роль успешно созданна!' })
  } catch (error) {
    res.status(500).json({ message: 'Ну далось создать роль!' })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  const candidate = await Role.findOne({
    name: req.body.name,
    _id: { $ne: req.params.id }
  })

  if (candidate) {
    res.status(409).json({ message: 'Роль с таким именем уже существует!' })
    return
  }

  try {
    await Role.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить роль!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Role.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Роль удалена!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить роль!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id, { password: 0 })
    res.status(200).json(role)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить роль!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const roles = await Role.find().sort({ created: -1 })
    // TODO агрегация
    // const total = await Role.find(query).countDocuments()
    res.json({ data: roles })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список ролей!' })
  }
}
