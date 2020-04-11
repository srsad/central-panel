/**
 * Модель списка деталей
 */

const { model, Schema } = require('mongoose')

const part = new Schema({
  name: {
    type: String,
    maxlength: 255,
    required: true,
    index: true
  },
  brands: [
    {
      type: Schema.Types.ObjectId,
      ref: 'source_site'
    }
  ],
  service: {
    type: String
  },
  price: {
    type: String // Иногда может встречаться текст -_-
  },
  impuls: {
    type: String
  },
  rservice: {
    type: String
  },
  datas: {
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
