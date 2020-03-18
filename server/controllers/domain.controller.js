const Domain = require('../models/domain.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const domain = new Domain(req.body)
    await domain.save()
    res.status(201).json({ message: 'Домен успешно создан!' })
  } catch (error) {
    res.status(500).json({ message: 'Не создать домен!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Domain.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не обновить данные домена!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Domain.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Домен удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить домен!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await Domain.findById()
    res.status(200).json(user)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть домен!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const apis = await Domain.find().sort({ created: -1 })
    res.json({ data: apis })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список доменов!' })
  }
}
