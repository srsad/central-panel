/**
 * @typedef ReportBranches - Список филиалов из ремонлайн
 * @property {string} name.required - Наименование филиала полученное из ремонлайн
 * @property {string} branch_id.required - id филиала полученное из ремонлайн
 */

const { model, Schema } = require('mongoose')

const branchesSchema = new Schema({
  name: {
    type: String,
    require: true,
    index: true
  },
  branch_id:{
    type: String,
    require: true,
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
