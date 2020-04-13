const Part = require('../models/part.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    await Part.create(req.body)
    res.status(201).json({ message: 'Деталь успешно добавленна!' })
  } catch (error) {
    // console.error('error part.controller - create', error)
    res.status(409).json({ message: 'Не удалось добавить деталь!' })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Part.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные детали!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Part.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Деталь удалена!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить деталь!', error })
  }
}

/**
 * Проверка на наличие
 * Если существует, то обновляем
 * Если не сущетсвует, то создаем
 * */
module.exports.check = async (req, res) => {
  const candidate = await Part.findOne({
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category
  })

  if (candidate || req.body._id) {
    const id = req.body._id || candidate._id
    // обновляем
    const $set = req.body
    try {
      await Part.updateOne({ _id: id }, { $set }, { new: true })
      res.json({ message: 'Данные обновленны!' })
    } catch (error) {
      console.error('error part.controller - check | upd', error)
      res
        .status(500)
        .json({ message: 'Не удалось обновить данные детали!', error })
    }
  } else {
    // создаем
    try {
      await Part.create(req.body)
      res.status(201).json({ message: 'Деталь успешно добавленна!' })
    } catch (error) {
      console.error('error part.controller - check | create', error)
      res.status(409).json({ message: 'Не удалось добавить деталь!' })
    }
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id)
    res.status(200).json(part)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть деталь!', error })
  }
}

/** Вернуть список деталей */
module.exports.getAll = async (req, res) => {
  const where = {}
  if (req.query.name) where.name = req.query.name
  if (req.query.brand) where.brand = req.query.brand.toLowerCase()
  if (req.query.category) where.category = req.query.category.toLowerCase()
  try {
    const parts = await Part.find(where).sort({ created: -1 })
    res.json({ data: parts })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список деталей!' })
  }
}
