const Domain = require('../models/domain.model')

/** Создание */
module.exports.create = async (req, res) => {
  const fd = req.body
  fd.yametrika = {
    code: fd.yametrika.replace('{', '{ ').replace(/ {1,}/g, ' ')
  }
  const yametrikaId = fd.yametrika.code.match(/(?<=ym\()\d*/)
  if (yametrikaId) {
    fd.yametrika.id = yametrikaId[0]
  }

  fd.analytics = {
    code: fd.analytics.replace('{', '{ ').replace(/ {1,}/g, ' ')
  }
  const analyticsId = fd.analytics.code.match(/\w{2}-\d*-\d{1,2}/)
  if (analyticsId) {
    fd.analytics.id = analyticsId[0]
  }

  fd.envybox = {
    code: fd.envybox.replace('{', '{ ').replace(/ {1,}/g, ' ')
  }
  // eslint-disable-next-line no-useless-escape
  const envyboxId = fd.envybox.code.match(/(?<=wcb_code\=)\w*/)
  if (envyboxId) {
    fd.envybox.id = envyboxId[0]
  }

  fd.alloka = {
    code: fd.alloka.replace('{', '{ ').replace(/ {1,}/g, ' ')
  }

  // eslint-disable-next-line no-useless-escape
  const allokaId = fd.alloka.code.match(/(?<=(\'|pt\/))\w*/)
  if (allokaId) {
    fd.alloka.id = allokaId[0]
  }

  try {
    await Domain.create(fd)
    res.status(201).json({ message: 'Домен успешно создан!' })
  } catch (error) {
    let msg = ''
    if (error.errmsg.includes('$domain_1')) {
      msg = ' Доменное имя уже существует!'
    }
    res.status(409).json({ message: 'Домен не добавлен!' + msg, error })
  }
}

/** Обновление */
module.exports.update = async (req, res) => {
  const $set = req.body
  try {
    await Domain.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message: 'Данные обновленны!' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Не удалось обновить данные домена!', error })
  }
}

/** Удаление */
module.exports.remove = async (req, res) => {
  try {
    await Domain.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Домен удален!' })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить домен!', error })
  }
}

/** Вернуть по id */
module.exports.getById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id)
    res.status(200).json(domain)
  } catch (error) {
    req.status(500).json({ message: 'Не удалось полуичть домен!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ created: -1 })
    res.json({ data: domains })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список доменов!' })
  }
}
