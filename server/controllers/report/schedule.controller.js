const Schedule = require('../../models/report/schedule.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    await Schedule.create(req.body)
    res.status(201).json({ message: 'График создан!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить график!', error })
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Schedule.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить данные!', error })
  }
}

/**
 * Удаление
 */
module.exports.remove = async (req, res) => {
  try {
    await Schedule.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'График удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить график!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
    req.params.id
    res.status(200).json(schedule)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть график!', error })
  }
}

/**
 * Вернуть по id бренда
 */
module.exports.getByBrandId = async (req, res) => {
  try {
    const schedule = await Schedule.find({
      branch: req.params.id
    })
    res.status(200).json(schedule)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть график!', error })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ name: 1 })
    res.json(schedules)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список графиков!', error })
  }
}


