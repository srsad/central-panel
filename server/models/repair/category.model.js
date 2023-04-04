/**
 * Категории для брендов
 * @typedef RepairCategory - Список категорий
 * @property {string} name.required - Наименование категории
 * @property {string} brand_id.required - id бренда к которой привязанна категория
 */

const { model, Schema } = require('mongoose')

const repairCategorySchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    index: true
  },
  // id бренд к которой пренадлежит категория
  brand_id: {
    type: Schema.Types.ObjectId,
    ref: 'repair_brands'
  },
  // коллекция неисправностей к которой пренодлежит данная категория
  malfunctions_id: {
    type: Schema.Types.ObjectId,
    ref: 'repair_malfunctions'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('repair_categories', repairCategorySchema)