const SSite = require('../models/sourceSite.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const formData = req.body
    delete formData.image
    // formData.menuindex = await getNextSequence()
    formData.menuindex = 0
    const sourceSite = await new SSite(formData)
    sourceSite.save()
    if (req.body.image) {
      console.log('save image')
    }
    res.status(201).json({ message: 'Источник создан!' })
  } catch (error) {
    let msg = ''
    if (error.errmsg.includes('$domain_1')) {
      msg = ' Доменное имя уже существует!'
    }
    res.status(409).json({ message: 'Источник не добавлен!' + msg, error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await SSite.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить данные!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await SSite.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Источник удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить источник!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const domain = await SSite.findById()
    res.status(200).json(domain)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть источник!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const domains = await SSite.find().sort({ created: -1 })
    res.json({ data: domains })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список источников!' })
  }
}

async function getNextSequence() {
  return (await SSite.find().count()) + 1 || 0
}
