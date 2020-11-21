const RequestTyp = require('../../models/crm/requestTyp.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const city = new RequestTyp(req.body)
    await city.save()
    res.status(201).json({ message: 'Тип заявки успешно добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать тип заявки!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await RequestTyp.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные типа заявки!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await RequestTyp.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Тип заявки удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить тип заявки!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await RequestTyp.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть тип заявки!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const apis = await RequestTyp.find().sort({ created: -1 })
    res.json({ data: apis })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список типов заявок!' })
  }
}
