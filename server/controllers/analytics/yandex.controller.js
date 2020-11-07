/**
 * Контроллер для работы yandex
 */
const YandexAccaunt = require('../../models/analytics/yandex/accaunt.model')

 /**
  * Создание пользователя
  */
module.exports.createUser = async (req, res) => {
  try {
    const formData = req.body
    const candidate = await YandexAccaunt.findOne({
      user_id: formData.user_id
    })
    if (candidate) {
      res.status(409).json({ message: 'Такой аккаунт уже привязан!' })
    } else {
      await YandexAccaunt.create(formData)
      res.status(201).json({ message: 'Пользователь добавлен!' })
    }
  } catch (e) {
    res.status(500).json({ message: 'Не удалось добавить аккаунт!' })
  }
}

/**
 * Удалить аккаунт
 */
module.exports.remove = async (req, res) => {
  try {
    const accaunts = await YandexAccaunt.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Аккаунт успешно удален!' })
  } catch (e) {
    res.status(500).json({ message: 'Не удалось удалить аккаунт!' })
  }
}

/**
 * Возвращаем список всех аккаунтов
 */
module.exports.getAll = async (req, res) => {
  try {
    const accaunts = await YandexAccaunt.find()
    res.json({ data: accaunts })
  } catch (e) {
    res.status(500).json({ message: 'Не удалось получить списов яндекс аккаунтов!' })
  }
}
