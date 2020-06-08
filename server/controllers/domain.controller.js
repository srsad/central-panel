const axios = require('axios')
const Domain = require('../models/domain.model')

/** Создание */
module.exports.create = async (req, res) => {
  const fd = req.body
  fd.yametrika = {
    code: fd.yametrika.replace('{', '{ ').replace(/ {1,}/g, ' ')
  }
  const yametrikaId = fd.yametrika.code.match(
    /((?<=ym\()\d*|(?<=id:)\d*|(?<=watch\/)\d*)/
  )
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

  fd.map_script = fd.map_script.replace('{', '{ ').replace(/ {1,}/g, ' ')

  let message = 'Домен успешно создан!'

  try {
    await updateSourceOptions(fd)
  } catch (error) {
    // eslint-disable-next-line prettier/prettier
    message = 'Домен успешно создан! Но не удалось обновить данные у источника ' + fd.domain
  }

  try {
    await Domain.create(fd)
    res.status(201).json({ message })
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
  // const fd = req.body
  $set.yametrika.code = $set.yametrika.code
    .replace('{', '{ ')
    .replace(/ {1,}/g, ' ')
  const yametrikaId = $set.yametrika.code.match(
    /((?<=ym\()\d*|(?<=id:)\d*|(?<=watch\/)\d*)/
  )
  $set.yametrika.id = yametrikaId ? yametrikaId[0] : ''

  $set.analytics.code = $set.analytics.code
    .replace('{', '{ ')
    .replace(/ {1,}/g, ' ')
  const analyticsId = $set.analytics.code.match(/\w{2}-\d*-\d{1,2}/)
  $set.analytics.id = analyticsId ? analyticsId[0] : ''

  $set.envybox.code = $set.envybox.code
    .replace('{', '{ ')
    .replace(/ {1,}/g, ' ')
  // eslint-disable-next-line no-useless-escape
  const envyboxId = $set.envybox.code.match(/(?<=wcb_code\=)\w*/)
  $set.envybox.id = envyboxId ? envyboxId[0] : ''

  $set.alloka.code = $set.alloka.code.replace('{', '{ ').replace(/ {1,}/g, ' ')
  // eslint-disable-next-line no-useless-escape
  const allokaId = $set.alloka.code.match(/(?<=(\'|pt\/))\w*/)
  $set.alloka.id = allokaId ? allokaId[0] : ''

  $set.map_script = $set.map_script.replace('{', '{ ').replace(/ {1,}/g, ' ')

  let message = 'Данные обновленны!'
  try {
    await updateSourceOptions($set)
  } catch (error) {
    // eslint-disable-next-line prettier/prettier
    message = 'Данные обновленны! Но не удалось обновить у источника ' + $set.domain
  }

  try {
    await Domain.findOneAndUpdate(
      { _id: req.params.id },
      { $set },
      { new: true }
    )
    res.json({ message })
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
    res.status(500).json({ message: 'Не удалось полуичть домен!', error })
  }
}

/** Вернуть по адрессу */
module.exports.getByAddress = async (req, res) => {
  try {
    // TODO сделать нормальный полнотектовый поиск
    // const regex = new RegExp(req.params.address, 'i')
    const select = await Domain.find().sort({ created: -1 })

    const domains = select.filter((el) => {
      if (el.address.includes(req.params.address)) return el
    })
    // console.log('domains', domains)
    res.status(200).json({ data: domains })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось полуичть домен!', error })
  }
}

/** Вернуть весь список */
module.exports.getAll = async (req, res) => {
  try {
    const domains = await Domain.find().sort({ color: 1 })
    res.json({ data: domains })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список доменов!' })
  }
}

/** Сохраняем данные на источнике */
async function updateSourceOptions(options) {
  try {
    // axios.$setToken(false)
    await axios.get(`https://${options.domain}/rest/`, {
      params: {
        create: 'options',
        address: options.address || '',
        alloka: options.alloka.code.replace(/script/gi, '###') || '',
        analytics: options.analytics.code.replace(/script/gi, '###') || '',
        envybox: options.envybox.code.replace(/script/gi, '###') || '',
        map_script: options.map_script.replace(/script/gi, '###') || '',
        phone_default: options.phone_default || '',
        work_time: options.work_time || '',
        yametrika: options.yametrika.code.replace(/script/gi, '###') || ''
      }
    })
  } catch (e) {
    console.log('updateSourceOptions error', e)
    return false
  }
}
