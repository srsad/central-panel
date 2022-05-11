/**
 * Устройства категории
 * @typedef RepairCategory - Список категорий
 * @property {string} name.required - Наименование категории
 * @property {string} brand_id.required - id бренда к которой привязанна категория
 */

const { model, Schema } = require('mongoose')

const repairDeviceSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    index: true
  },
  // серия
  series: {
    type: String,
    maxlength: 255,
    index: true
  },
  // id привязанной категории
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'repair_categories'
  },
  // id привязанной категории неисправностей (приоритетный)
  // если его нет, то берем категорию неисправностей для всей категории
  malfunctions_id: {
    type: Schema.Types.ObjectId,
    ref: 'repair_malfunctions'
  },
  // Исключения
  excepts: {
    type: Array,
    default: []
  },
  // Доступен для записи
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('repair_devices', repairDeviceSchema)
