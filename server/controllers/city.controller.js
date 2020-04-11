const City = require('../models/city.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const city = new City(req.body)
    await city.save()
    res.status(201).json({ message: 'Город успешно добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать город!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await City.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные города!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await City.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Город удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить город!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await City.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть город!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const apis = await City.find().sort({ created: -1 })
    res.json({ data: apis })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список городов!' })
  }
}
