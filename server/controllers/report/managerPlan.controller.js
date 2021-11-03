const ManagerPlan = require('../../models/report/managerPlan.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    await ManagerPlan.create(req.body)
    res.status(201).json({ message: 'Отчет добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить отчет!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await ManagerPlan.findOneAndUpdate(
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
    await ManagerPlan.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Бред удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить отчет!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const recording = await ManagerPlan.findById(req.params.id)
    res.status(200).json(recording)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть отчет!', error })
  }
}

/**
 * Вывод планов конкретного филиала
 */
module.exports.getByBranch = async (req, res) => {
  try {
    const items = await ManagerPlan.find({
      branch: req.params.branchId,
    })
    .sort({ name: 1 })
    res.json(items)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список отчетов!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const recordings = await ManagerPlan.find().sort({ name: 1 })
    res.json(recordings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список отчетов!', error })
  }
}
