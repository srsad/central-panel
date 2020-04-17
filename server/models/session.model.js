/**
 * Сессии
 * refresh_token = sessions._id
 */

const { model, Schema } = require('mongoose')

const sessionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  fingerprint: {
    type: String,
    required: true
  },
  os: {
    type: String,
    required: true
  },
  browser: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  // время жизни после создания
  expired: {
    type: Date,
    default: Date.now,
    expires: 3 // секунды
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('sessions', sessionSchema)
