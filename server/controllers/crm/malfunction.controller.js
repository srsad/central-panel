const Malfunctions = require('../../models/crm/malfunction.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    await Malfunctions.create(req.body)
    res.status(201).json({ message: 'Бренд добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить неисправность!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Malfunctions.findOneAndUpdate(
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
  try {
    await Malfunctions.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Бред удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить неисправность!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const malfunction = await Malfunctions.findById(req.params.id)
    res.status(200).json(malfunction)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть неисправность!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const malfunctions = await Malfunctions.find().sort({ name: 1 })
    res.json(malfunctions)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список неисправностей!', error })
  }
}

/** Вернуть первые 20 элементов */
module.exports.getFirstItems = async (req, res) => {
  try {
    const malfunctions = await Malfunctions.find().sort({ name: 1 }).limit(20)
    res.json(malfunctions)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список неисправностей!', error })
  }
}

/**
 * Поиск по название неисправностьа
 */
module.exports.getByName = async (req, res) => {
  try {
    const regex = new RegExp(req.params.query, 'ig')
    const brands = await Malfunctions.find({ name: regex  }).sort({ name: 1 }).limit(5)
    res.json({ data: brands })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось найти неисправность!' })
  }
}

