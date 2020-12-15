/**
 * Отчеты - план
 * @typedef ReportPlans - план
 * @property {string} name.required - наименование отчета 
 * @property {string} plan_date.required - дата плана 
 * @property {string} branch.required - id филиала из таблицы report_branches
 * @property {integer} planned -  Планируемые
 * @property {integer} fulfillment -  Выполнение
 * @property {integer} actual -  Фактические
 * @property {integer} number_of_orders -  Количество заказов
 * @property {integer} gross_profit -  Валовая прибыль
 * @property {integer} average_bill -  Средний чек
 */

const { model, Schema } = require('mongoose')

const reportPlans = new Schema({
  name: {
    type: String,
    maxlength: 255,
    unique: true,
    index: true
  },
  // дата плана
  plan_date: {
    type: String,
    default: '',
    require: true
  },
  // Филиал
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'report_branches',
    require: true,
    index: true
  },
  // Планируемые
  planned: {
    type: Number,
    default: 0
  },
  // Выполнение
  fulfillment: {
    type: Number,
    default: 0
  },
  // Фактические
  actual: {
    type: Number,
    default: 0
  },
  // Количество заказов
  number_of_orders: {
    type: Number,
    default: 0
  },
  // Валовая прибыль
  gross_profit: {
    type: Number,
    default: 0
  },
  // Средний чек
  average_bill: {
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

module.exports = model('report_plans', reportPlans)
