/**
 * Модель списка неисправностей для CRM
 */

const { model, Schema } = require('mongoose')

const crmMalfunctionSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    index: true,
    require: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('crm_malfunctions', crmMalfunctionSchema)
