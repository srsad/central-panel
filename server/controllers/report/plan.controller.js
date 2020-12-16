const Plan = require('../../models/report/plan.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    await Plan.create(req.body)
    res.status(201).json({ message: 'План добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить план!', error })
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Plan.findOneAndUpdate(
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
    await Plan.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Бред удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить план!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id)
    res.status(200).json(plan)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть план!', error })
  }
}

/**
 * Вернуть список данных
 */
module.exports.getList = async (req, res) => {
  try {
    const plans = await Plan.find({ branch: req.query.branch }).sort({ plan_date: -1 })
    res.json(plans)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список планов!', error })
  }
}
