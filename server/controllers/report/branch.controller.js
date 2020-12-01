const Branch = require('../../models/report/branches.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    await Branch.create(req.body)
    res.status(201).json({ message: 'Филиал добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить филиал!', error })
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Branch.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить данные!', error })
  }
}

/**
 * Удаление
 */
module.exports.remove = async (req, res) => {
  try {
    await Branch.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Филиал удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить филиал!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id)
    res.status(200).json(branch)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть филиал!', error })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const branches = await Branch.find().sort({ name: 1 })
    res.json(branches)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список филиалов!', error })
  }
}


