const NotRecording = require('../../models/recording/notRecording.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    await NotRecording.create(req.body)
    res.status(201).json({ message: 'Запись добавленна!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавленна запись!', error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await NotRecording.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить запись!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await NotRecording.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Запись удаленна!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить запись!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const recording = await NotRecording.findById()
    res.status(200).json(recording)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть запись!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const recordings = await NotRecording.find().sort({ created: -1 })
    res.json(recordings)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список записей!' })
  }
}
