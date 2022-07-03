const DeviceNotRecording = require('../../models/recording/notRecordingForDevice.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    await DeviceNotRecording.create(req.body)
    res.status(201).json({ message: 'Запись добавленна!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось добавить запись!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await DeviceNotRecording.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Запись удаленна!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить запись!', error })
  }
}

/** Вернуть по бренду */
module.exports.getByBrand = async (req, res) => {
  try {
    const recordings = await DeviceNotRecording.find({
      brand: req.params.brand
    }).sort({ created: -1 })
    res.json(recordings)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть запись!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const recordings = await DeviceNotRecording.find().sort({ created: -1 })
    res.json(recordings)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список записей!' })
  }
}
