const DeviceType = require('../../models/crm/deviceType.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const deviceType = new DeviceType(req.body)
    await deviceType.save()
    res.status(201).json({ message: 'Тип устройства успешно добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать тип устройства!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await DeviceType.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные типа устройства!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await DeviceType.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Тип устройства удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить тип устройства!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await DeviceType.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть тип устройства!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const apis = await DeviceType.find().sort({ created: -1 })
    res.json({ data: apis })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список типов устройств!' })
  }
}
