const Part = require('../models/part.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const part = new Part(req.body)
    await part.save()
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
      .json({ message: 'Не удалось обновить данные домена!', error })
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
  try {
    const part = new Part(req.body)
    await part.save()
    res.status(201).json({ message: 'Деталь успешно добавленна!' })
  } catch (error) {
    // console.error('error part.controller - create', error)
    res.status(409).json({ message: 'Не удалось добавить деталь!' })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id)
    res.status(200).json(part)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть домен!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  const where = req.body.brand ? req.body.brand : {}
  if (req.body.brand) where.brand = req.body.brand.toLowerCase()
  try {
    const parts = await Part.find(where).sort({ created: -1 })
    res.json({ data: parts })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список доменов!' })
  }
}
