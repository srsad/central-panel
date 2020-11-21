/**
 * Модель типов завки - например СЦ, гарантия
 * связать с пользователями
 */

const { model, Schema } = require('mongoose')

const crmTypeRequest = new Schema({
  // тип заявки
  name: {
    type: String,
    require: true,
    index: true,
  },
  menuindex: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('crm_type_requests', crmTypeRequest)
