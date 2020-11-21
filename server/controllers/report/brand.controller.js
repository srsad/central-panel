const Brand = require('../../models/report/brands.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    await Brand.create(req.body)
    res.status(201).json({ message: 'Бренд добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить бренд!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Brand.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить данные!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  // TODO при удалении бренда, удалять и его зависимости в summaryReport.controller.js
  try {
    await Brand.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Бред удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить бренд!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const recording = await Brand.findById()
    res.status(200).json(recording)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть бренд!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const recordings = await Brand.find().sort({ name: 1 })
    res.json(recordings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список брендов!', error })
  }
}

/**
 * Поиск по название бренда
 */
module.exports.getByName = async (req, res) => {
  try {
    const regex = new RegExp(req.params.query, 'ig')
    const brands = await Brand.find({ name: regex  }).sort({ name: 1 }).limit(5)
    res.json({ data: brands })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось найти бренд!' })
  }
}
