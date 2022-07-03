const Device = require('../../models/repair/device.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    const result = await Device.create(req.body)
    res.status(201).json({ message: 'Устройство добавлено!', data: result })
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        message:
          'Не удалось добавить устройство, так как такое устройство уже существует!',
        error
      })
    } else {
      res
        .status(500)
        .json({ message: 'Не удалось добавить устройство!', error })
    }
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Device.findOneAndUpdate(
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
    await Device.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Устройство удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить устройство!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id)
    res.status(200).json(device)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть устройство!', error })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const devices = await Device.find().sort({ name: 1 })
    res.json(devices)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список устройств!', error })
  }
}

/**
 * Вернуть весь список по id бренда
 */
module.exports.getAllByCategoryId = async (req, res) => {
  try {
    const devices = await Device.find({
      category_id: req.params.id
    }).sort({ name: 1 })

    res.json(devices)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список устройств!', error })
  }
}
