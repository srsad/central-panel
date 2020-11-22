/**
 * Модель для вебхуков
 * @typedef AnalyticsWebhook - Модель вебхуков
 * @property {string} hook_name.required - сервиса откуда лети вебхук
 * @property {Array.<string>} params - массив данных вебхука
 */
const { model, Schema } = require('mongoose')

const webhookSchema = new Schema({
  // енвибокс, аллока и т.д.
  hook_name: {
    type: String,
    index: true,
    require: true
  },
  // параметры хука
  params: {
    type: Array,
    default: []
  },
  // дата создания
  created: {
    type: Date,
    default: Date.now
  },
})

module.exports = model('analytics_webhook', webhookSchema)
