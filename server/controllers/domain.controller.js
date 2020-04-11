const Domain = require('../models/domain.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const domain = new Domain(req.body)
    await domain.save()
    res.status(201).json({ message: 'Домен успешно создан!' })
  } catch (error) {
    let msg = ''
    if (error.errmsg.includes('$domain_1')) {
      msg = ' Доменное имя уже существует!'
    }
    res.status(409).json({ message: 'Домен не добавлен!' + msg, error })
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
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные домена!', error })
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
    const domain = await Domain.findById(req.params.id)
    res.status(200).json(domain)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть домен!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ created: -1 })
    res.json({ data: domains })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список доменов!' })
  }
}
