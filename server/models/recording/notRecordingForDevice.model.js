/**
 * Устроиства не для записи
 */

const { model,  Schema } = require('mongoose')

const notRecordingForDeviceSchema = new Schema({
  // название устроиства
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    index: true
  },
  brand: {
    type: String,
    required: true,
    maxlength: 255,
    index: true
  },
  status: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('not_recording_for_device', notRecordingForDeviceSchema)
