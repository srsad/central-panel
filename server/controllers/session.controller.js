const Session = require('../models/session.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    await Session.remove({ fingerprint: req.body.fingerprint })
  } catch (e) {}

  try {
    Session.create({ ...req.body })
    res.status(201).json({ message: 'Сессия успешно созданна!' })
  } catch (error) {
    res.status(500).json({ message: 'Ну далось создать сессию!' })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Session.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Сессия удалена!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить сессию!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить сессию!', error })
  }
}

/** Вернуть по id */
module.exports.getByFP = async (req, res) => {
  try {
    const session = await Session.find({ fingerprint: req.params.fp })
    res.status(200).json(session)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить сессию!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const session = await Session.find().sort({ created: -1 })
    res.json(session)
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список ролей!' })
  }
}
