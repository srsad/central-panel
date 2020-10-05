const Client = require('../../models/crm/client.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const city = new Client(req.body)
    await city.save()
    res.status(201).json({ message: 'Клиент успешно добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить клиента!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Client.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить клиента!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Client.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Клиент удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить клиента!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await Client.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть клиента!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const apis = await Client.find().sort({ menuindex: 1 })
    res.json({ data: apis })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список клиентов!' })
  }
}
