/**
 * @typedef ConstructorSites - Список наименования сайтов конструктора
 * @property {string} name.required - Наименование сайта
 */
// * @property {string} branch - id филиала из report_branches

const { model, Schema } = require('mongoose')

const constructorSiteSchema = new Schema({
  // Наименование
  name: {
    type: String,
    require: true,
    index: true
  },
  // Филиал
  // branch: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'report_branches',
  //   index: true,
  // },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('constructor_sites', constructorSiteSchema)
