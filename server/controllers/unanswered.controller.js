const Unanswered = require('../models/unanswered.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    const fd = req.body
    await Unanswered.create(fd)
    req.io.emit('showUnansweredItem', { asds: 'user items' })
    res.status(201).json({ message: 'Запись добавлена!' })
  } catch (error) {
    res.status(400).json({ message: 'Не удалось добавить запись!', error })
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Unanswered.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(400).json({ message: 'Не удалось обновить данные!', error })
  }
}

/**
 * Удаление
 */
module.exports.remove = async (req, res) => {
  try {
    await Unanswered.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Запись удалена!' })
  } catch (error) {
    res.status(400).json({ message: 'Не удалось удалить запись!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const unanswered = await Unanswered.findById(req.params.id)
    res.status(200).json(unanswered)
  } catch (error) {
    req.status(400).json({ message: 'Не удалось полуичть запись!', error })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const unanswereds = await Unanswered.find({}).sort({ created: -1 })
    res.json(unanswereds)
  } catch (error) {
    res.status(400).json({ message: 'Не удалось получить список запись!', error })
  }
}
