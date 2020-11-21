/**
 * Бренды для раздела - отчеты
 * @typedef ReportBrands - Список брендов
 * @property {string} name.required - Наименование бренда полученное из ремонлайн или созданное в ручную
 */
// TODO сделать их общими, вынести за рамки этого раздела

const { model, Schema } = require('mongoose')

const reportBrandSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    unique: true,
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

module.exports = model('report_brands', reportBrandSchema)
