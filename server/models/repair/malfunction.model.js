/**
 * Каталог неисправностей
 * @typedef RepairMalfunction - Список неисправностей
 * @property {string} name.required - Наименование категории
 * @property {array} malfunctions - Массив с неисправностями
 * @property {number} menuindex - индекс для сортировки
 */

const { model, Schema } = require('mongoose')

const repairMalfunctionSchema = new Schema({
  // наименование колекции с неисправностями
  name: {
    type: String,
    maxlength: 255,
    unique: true,
    index: true
  },
  // массив с элементами неисправностей
  // наименование, цена ремонта, время ремонта
  malfunctions: {
    type: Array,
    default: []
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
    type: Date
  }
})

module.exports = model('repair_malfunctions', repairMalfunctionSchema)
