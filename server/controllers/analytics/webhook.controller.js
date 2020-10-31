const Webhook = require('../../models/analytics/webhook.model')

/**
 * Создание
 */
module.exports.create = async (req, res) => {
  console.log('Webhook -', req.body, req.params.source)
  try {
    const fd = {
      hook_name: req.params.source,
      params: [req.body]
    }
    console.log('fd', fd)
    await Webhook.create(fd)
    res.status(201).json({ message: 'Bебхук обработан!' })
  } catch (e) {
    res.status(500).json({ message: 'Не удалось обработать, вебхук!', error: e })
  }
}

/**
 * Вернуть весь список
 */
module.exports.getAll = async (req, res) => {
  try {
    const webhooks = await Webhook.find().sort({ created: -1 })
    res.json({ data: webhooks })
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить список ролей!' })
  }
}

