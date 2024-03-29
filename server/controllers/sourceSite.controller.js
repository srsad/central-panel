const path = require('path')
const moment = require('moment')
const { imageLoader, rimraf } = require('../utils/imageUploader')
const SSite = require('../models/sourceSite.model')

/** Создание */
module.exports.create = async (req, res) => {
  try {
    const formData = req.body
    delete formData.image
    // formData.menuindex = await getNextSequence()
    formData.menuindex = 0
    if (formData.categories) {
      formData.categories = JSON.parse(formData.categories)
    }
    const sourceSite = new SSite(formData)
    await sourceSite.save()
    // если еcть картинка
    if (req.files.image) {
      let logoPath = ''
      const basePath = '../../static/site/images/brand/'
      const fileName = `${moment().format('YYYY-MM-DD-HHmmss_SSS')}-${
        req.files.image.name
      }`
      logoPath = await imageLoader({
        basePath,
        fileName,
        filePath: `/${sourceSite._id}/${fileName}`,
        savePath: `/${sourceSite._id}/`, // '../../static/site/images/brand/' + ${sourceSite._id}
        bufferImage: req.files.image.data
      })
      const $set = {}
      if (logoPath !== '') $set.image = logoPath
      await SSite.updateOne({ _id: sourceSite._id }, { $set }, { new: true })
    }
    res.status(201).json({ message: 'Источник создан!' })
  } catch (error) {
    let msg = ''
    if (error.errmsg.includes('$source_1')) {
      msg = ' Доменное имя уже привязанно!'
    }
    res.status(409).json({ message: 'Источник не добавлен!' + msg, error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    let logoPath = ''
    // если еcть картинка
    if (req.files.image) {
      const basePath = '../../static/site/images/brand/'
      const fileName = `${moment().format('YYYY-MM-DD-HHmmss_SSS')}-${
        req.files.image.name
      }`

      // удаляем папку со старой картинкой
      rimraf(path.resolve(__dirname, basePath + req.params.id))
      // грузим новую
      logoPath = await imageLoader({
        basePath,
        fileName,
        filePath: `/${req.params.id}/${fileName}`,
        savePath: `/${req.params.id}/`, // '../../static/site/images/brand/' + ${req.params.id}
        bufferImage: req.files.image.data
      })
    }
    if ($set.categories) $set.categories = JSON.parse($set.categories)
    if (logoPath !== '') $set.image = logoPath
    await SSite.updateOne({ _id: req.params.id }, { $set }, { new: true })
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    let msg = ''
    if (error.errmsg.includes('$source_1')) {
      msg = ' Доменное имя уже привязанно!'
    }
    res.status(409).json({ message: 'Источник не добавлен!' + msg, error })
  }
}

/** Обновления menuindex */
module.exports.updateMenuindex = async (req, res) => {
  try {
    for (const item of req.body) {
      await SSite.updateOne(
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

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    // удаляем папку с картинкой
    // eslint-disable-next-line prettier/prettier
    rimraf(path.resolve(__dirname, '../../static/site/images/brand/' + req.params.id))
    await SSite.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Источник удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить источник!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const page = await SSite.findById(req.params.id)
    res.status(200).json({ data: page })
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть источник!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const pages = await SSite.find().sort({ menuindex: 1 })
    res.json({ data: pages })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список источников!' })
  }
}
