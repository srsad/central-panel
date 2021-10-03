const Site = require('../../models/constructor/site.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    const formData = { ...req.body }
    await Site.create(formData)
    res.status(201).json({ message: 'Сайт успешно добавлен!' })
  } catch (error) {
    console.error('error constructor.site.controller - create', error)
    res.status(500).json({ message: 'Не удалось добавить сайт!' })
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Site.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные сайта!', error })
  }
}

/**
 * Удаление
 */
module.exports.remove = async (req, res) => {
  try {
    await Site.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Сайт удалена!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить сайт!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const part = await Site.findById(req.params.id)
    res.status(200).json(part)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть сайт!', error })
  }
}

/**
 * Вернуть всесь список сайтов
 */
module.exports.getAll = async (req, res) => {
  try {
    const sites = await Site.find({}).sort({ created: -1 })
    res.json({ data: sites })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список сайтов!' })
  }
}
