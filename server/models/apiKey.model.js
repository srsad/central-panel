/**
 * API ключи
 */

const { model, Schema } = require('mongoose')

const apiKeySchema = new Schema({
  comments: {
    type: String,
    maxlength: 255,
    required: true,
    index: true
  },
  key: {
    type: String,
    maxlength: 64,
    required: true
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

module.exports = model('api_keys', apiKeySchema)
