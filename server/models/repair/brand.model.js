/**
 * Бренды для основного раздела
 * @typedef RepairBrands - Список брендов
 * @property {string} name.required - Наименование бренда полученное из ремонлайн или созданное в ручную
 * @property {number} menuindex - Индекс бренда, нужендля сортировки
 */

const { model, Schema } = require('mongoose')

const repairBrandSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    unique: true,
    index: true
  },
  image: {
    type: String,
    default: ''
  },
  menuindex: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('repair_brands', repairBrandSchema)
