/**
 * Модель списка деталей
 */

const { model, Schema } = require('mongoose')

const part = new Schema({
  // наименование детали
  name: {
    type: String,
    maxlength: 255,
    required: true,
    index: true
  },
  // бренда по toLowerCase
  brand: {
    type: String,
    maxlength: 255,
    required: true
  },
  // категория к которой привязана деталь (смартфоны/ноутбуки/моноблоки и т.д.)
  category: {
    type: String
  },
  // цена детали
  price: {
    type: String // Иногда может встречаться текст -_-
  },
  // цена ремонта impuls
  impuls: {
    type: String
  },
  // цена ремонта rservice
  rservice: {
    type: String
  },
  // описание
  description: {
    type: String,
    maxlength: 255
  },
  // список исключений, намеренно не назвал exceptions
  excepts: {
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

module.exports = model('parts', part)
