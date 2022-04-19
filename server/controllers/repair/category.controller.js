const Category = require('../../models/repair/category.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    await Category.create(req.body)
    res.status(201).json({ message: 'Категория добавлена!' })
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        message:
          'Не удалось добавить категорию, так как такая категория уже существует!',
        error
      })
    } else {
      res.status(500).json({ message: 'Не удалось добавить категорию!', error })
    }
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Category.findOneAndUpdate(
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
    await Category.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Категория удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить категорию!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const recording = await Category.findById(req.params.id)
    res.status(200).json(recording)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть категорию!', error })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const recordings = await Category.find().sort({ name: 1 })
    res.json(recordings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список категорий!', error })
  }
}

/**
 * Вернуть весь список по id бренда
 */
module.exports.getAllById = async (req, res) => {
  try {
    const recordings = await Category.find({
      brand_id: req.params.id
    }).sort({ name: 1 })

    res.json(recordings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список категорий!', error })
  }
}
