/**
 * Модель города
 */

const { model, Schema } = require('mongoose')

const citySchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    unique: true,
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('cities', citySchema)
