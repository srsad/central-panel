const path = require('path')
const moment = require('moment')
const { imageLoader, rimraf } = require('../../utils/imageUploader')
const Brand = require('../../models/repair/brand.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  try {
    const formData = req.body
    delete formData.image

    const brand = new Brand(formData)
    await brand.save()

    if (req.files.image) {
      let logoPath = ''
      const basePath = '../../static/site/images/brand/'
      const fileName = `${moment().format('YYYY-MM-DD-HHmmss_SSS')}-${
        req.files.image.name
      }`
      logoPath = await imageLoader({
        basePath,
        fileName,
        filePath: `/${brand._id}/${fileName}`,
        savePath: `/${brand._id}/`,
        bufferImage: req.files.image.data
      })
      const $set = {}
      if (logoPath) {
        $set.image = logoPath
      }
      await Brand.updateOne({ _id: brand._id }, { $set }, { new: true })
    }

    res.status(201).json({ message: 'Бренд добавлен!' })
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        message:
          'Не удалось добавить бренд, так как такой бренд уже существует!',
        error
      })
    } else {
      res.status(500).json({ message: 'Не удалось добавить бренд!', error })
    }
  }
}

/**
 * Обновление
 */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    let logoPath = ''
    const basePath = '../../static/site/images/brand/'

    // если еcть картинка
    if (req.files.image) {
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
        savePath: `/${req.params.id}/`,
        bufferImage: req.files.image.data
      })
    }

    if (!req.body.image || req.body.image === 'null') {
      rimraf(path.resolve(__dirname, basePath + req.params.id))
      $set.image = ''
    }

    if (logoPath) {
      $set.image = logoPath
    }

    await Brand.findOneAndUpdate(
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
    // удаляем папку с картинкой
    // eslint-disable-next-line prettier/prettier
    rimraf(path.resolve(__dirname, '../../static/site/images/brand/' + req.params.id))

    await Brand.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Бренд удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить бренд!', error })
  }
}

/**
 * Вернуть по id
 */
module.exports.getById = async (req, res) => {
  try {
    const recording = await Brand.findById(req.params.id)
    res.status(200).json(recording)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть бренд!', error })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const recordings = await Brand.find().sort({ name: 1 })
    res.json(recordings)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось получить список брендов!', error })
  }
}
