// const Brand = require('../../models/report/brans.model')
const Report = require('../../models/report/summoryReport.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const fd = req.body
    fd.brands = fd.brands_id.map((el) => {
      return { brand: el }
    })
    await Report.create(fd)
    res.status(201).json({ message: 'Отчет добавлен!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить отчет!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Report.findOneAndUpdate(
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
    await Report.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Отчет удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить отчет!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const report = await Report.findById(
      req.params.id
    ).populate('brands.brand', { name: 1 })

    res.status(200).json(report)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть отчет!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const reports = await Report.find().sort({ created: -1 })
    res.json(reports)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список отчетов!', error })
  }
}
