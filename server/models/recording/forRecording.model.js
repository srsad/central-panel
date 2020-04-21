/**
 * Список для записи
 */

const { model, Schema } = require('mongoose')

const forRecordingSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    required: true,
    index: true
  },
  category: {
    type: String,
    index: true,
    enum: [
      'Крупная Бытовая Техника',
      'Мелкая Бытовая Техника',
      'Электротранспорт',
      'Электрика',
      'Цифровая техника'
    ]
  },
  rservice: {
    type: String,
    maxlength: 255,
    index: true
  },
  impuls: {
    type: String,
    maxlength: 255,
    index: true
  },
  krd: {
    type: String,
    maxlength: 255,
    index: true
  },
  elservice: {
    type: String,
    maxlength: 255,
    index: true
  },
  curser: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('for_recording', forRecordingSchema)
