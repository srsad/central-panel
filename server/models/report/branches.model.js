/**
 * @typedef ReportBranches - Список филиалов из ремонлайн
 * @property {string} name.required - Наименование филиала полученное из ремонлайн
 * @property {string} branch_id.required - id филиала полученное из ремонлайн
 * @property {string} realname - Наименование введенное из панели управления
 * @property {string} short_code - шорт код филиала
 * @property {string} short_num_code - цифровой шорт код филиала
 * @property {string} address - физический адрес
 */

const { model, Schema } = require('mongoose')

const branchesSchema = new Schema({
  name: {
    type: String,
    require: true,
    index: true
  },
  realname: {
    type: String,
    default: '',
    index: true
  },
  branch_id: {
    type: String,
    require: true,
  },
  short_code: {
    type: String,
    default: ''
  },
  short_num_code: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
 })

module.exports = model('report_branches', branchesSchema)
