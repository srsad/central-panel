const Brand = require('../../models/repair/brand.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    await Brand.create(req.body)
    res.status(201).json({ message: 'Бренд добавлен!' })
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        message:
          'Не удалось добавить бренд, так как такой бренд уже существует!',
        error
      })
    } else {
      res.status(500).json({ message: 'Не удалось добавить бренд!', error })
    }
  }
}

/**
 * Обновление
 */
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

/**
 * Удаление
 */
module.exports.remove = async (req, res) => {
  try {
    await Brand.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Бренд удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить бренд!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const recording = await Brand.findById(req.params.id)
    res.status(200).json(recording)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть бренд!', error })
  }
}

/**
 * Вернуть весь список
 */
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
