const Malfunction = require('../../models/repair/malfunction.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    await Malfunction.create(req.body)
    res.status(201).json({ message: 'Коллекция неисправностей добавлен!' })
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        message: 'Не удалось создать, так как такая коллекция уже существует!',
        error
      })
    } else {
      res.status(500).json({
        message: 'Не удалось добавить коллекцию неисправностей!',
        error
      })
    }
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Malfunction.findOneAndUpdate(
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
    await Malfunction.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Коллекция неисправностей удалена!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось удалить коллекцию неисправностей!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const device = await Malfunction.findById(req.params.id)
    res.status(200).json(device)
  } catch (error) {
    req
      .status(500)
      .json({ message: 'Не удалось полуичть коллекцию неисправностей!', error })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const devices = await Malfunction.find().sort({ name: 1 })
    res.json(devices)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить коллекцию неисправностей!', error })
  }
}
