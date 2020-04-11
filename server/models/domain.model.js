/**
 * Модель доменных имен
 */

const { model, Schema } = require('mongoose')
// TODO добавить статус бана у гугла и яндекса
const domainSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    index: true
  },
  city: {
    type: String,
    maxlength: 32,
    index: true
  },
  brand: {
    type: String,
    maxlength: 255,
    index: true
  },
  domain: {
    type: String,
    maxlength: 255,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    maxlength: 255
  },
  vendor: {
    type: String,
    maxlength: 255,
    index: true
  },
  status: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    maxlength: 16
  },
  logs: {
    type: Array,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('domains', domainSchema)
