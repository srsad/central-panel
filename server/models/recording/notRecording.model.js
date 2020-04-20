/**
 * Список не для записи
 */

const { model, Schema } = require('mongoose')

const notRecordingSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    required: true,
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

module.exports = model('not_recording', notRecordingSchema)
