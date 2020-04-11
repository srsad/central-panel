/**
 * Модель подключаемых сайтов
 */

const { model, Schema } = require('mongoose')

const sourceSite = new Schema({
  name: {
    type: String,
    maxlength: 255,
    required: true,
    index: true
  },
  source: {
    type: String,
    maxlength: 255,
    unique: true,
    required: true,
    index: true
  },
  // rservice, impuls
  company: {
    type: String,
    enum: ['rservice', 'impuls'],
    default: 'rservice'
  },
  brand: {
    type: String,
    maxlength: 255,
    required: true,
    index: true
  },
  published: {
    type: Boolean,
    default: true
  },
  image: {
    type: String
  },
  menuindex: {
    type: Number,
    default: 0,
    index: true
  },
  categories: {
    type: Array,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('source_site', sourceSite)
