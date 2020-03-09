/**
 * Роли пользователей
 */

const { model, Schema } = require('mongoose')

const roleSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    unique: true,
    required: true
  },
  access: {
    type: Array,
    default: [] // нет доступов ни к одному из защищенных разделов
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

module.exports = model('roles', roleSchema)
