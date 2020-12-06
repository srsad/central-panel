/**
 * Недозвонившихся клиенты
 * @typedef Unanswerd - Модель вебхуков
 * @property {boolean} readed - статус прочтения
 * @property {Array.<string>} params.required - массив данных хука от алоки
 */

const { model, Schema } = require('mongoose')

const unanswerdSchema = new Schema({
  // Прочитан или нет
  readed: {
    type: Boolean,
    default: false,
    index: true
  },
  // параметры пойманного хука
  params: {
    type: Array,
    default: []
  },
  // дата создания
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  // время жизни после создания
  expired: {
    type: Date,
    default: Date.now,
    expires: 1209600 // неделя в секундах
  },
})

module.exports = model('unanswered', unanswerdSchema)
