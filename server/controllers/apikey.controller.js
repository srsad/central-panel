const ApiKey = require('../models/apiKey.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const apiKey = new ApiKey(req.body)
    await apiKey.save()
    res.status(201).json({ message: 'Ключ успешно создан!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать ключ!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await ApiKey.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не обновить данные кюча!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await ApiKey.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Ключ удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить ключ!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await ApiKey.findById()
    res.status(200).json(user)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть ключ!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const apis = await ApiKey.find().sort({ created: -1 })
    res.json({ data: apis })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список ключей!' })
  }
}
