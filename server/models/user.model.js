/**
 * Пользователи
 */

const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  description: {
    type: String,
    maxlength: 255
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
    maxlength: 32,
    index: true
  },
  active: {
    type: Boolean,
    required: true
  },
  avatar: {
    type: String
  },
  // blockeduntil - заблокирован до (дата)
  // blockedafter - заблокирован после (дата)
  role: {
    type: Schema.Types.ObjectId,
    ref: 'roles'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('users', userSchema)
