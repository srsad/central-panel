/**
 * Модель типа устройства
 * сматфон, планшет и т.д.
 */

const { model, Schema } = require('mongoose')

const deviceTypeSchema = new Schema({
  name: {
    type: String,
    require: true,
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

module.exports = model('crm_type_devices', deviceTypeSchema)
