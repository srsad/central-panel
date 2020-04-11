const Part = require('../models/part.model')

/** Создание */
module.exports.create = async (req, res) => {
  const item = req.body
  try {
    if (item.datas) item.datas = JSON.parse(item.datas)
    await new Part(item.datas).save()
    res.status(201).json({ message: 'Деталь успешно добавленна!' })
  } catch (error) {
    res.status(409).json({ message: 'Не удалось добавить деталь!' })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    if ($set.datas) $set.datas = JSON.parse($set.datas)
    await Part.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные домена!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Part.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Деталь удалена!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить деталь!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const domain = await Part.findById(req.params.id)
    res.status(200).json(domain)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть домен!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const domains = await Part.find().sort({ created: -1 })
    res.json({ data: domains })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список доменов!' })
  }
}
