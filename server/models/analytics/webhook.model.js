/**
 * Модель для вебхуков
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
