/**
 * Модель профиля подключаемого яндекс аккаунта
 */
const { model, Schema } = require('mongoose')

const yandexAccaunt = new Schema({
  user_id: {
    type: String,
    unique: true,
    require: true
  },
  login: {
    type: String,
    require: true
  },
  client_id: {
    type: String,
    require: true
  },
  emails: {
    type: Array,
    default: []
  },
  fullname: {
    type: String,
    default: ''
  },
  //
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('analytics_yandex_accaunt', yandexAccaunt)
