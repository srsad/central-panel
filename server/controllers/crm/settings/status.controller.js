const Status = require('../../../models/crm/status.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const city = new Status(req.body)
    await city.save()
    res.status(201).json({ message: 'Этап успешно добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить этап!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Status.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить этап!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Status.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Этап удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить этап!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const user = await Status.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть этап!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const apis = await Status.find().sort({ menuindex: 1 })
    res.json({ data: apis })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список этапов!' })
  }
}

/** Обновления menuindex */
module.exports.updateMenuindex = async (req, res) => {
  try {
    for (const item of req.body) {
      await Status.updateOne(
        { _id: item._id },
        { menuindex: item.menuindex },
        { new: true }
      )
    }
    res.status(200).json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось упорядочить список!', error })
  }
}

