/**
 * График расписаний - отчеты
 * @typedef ReportSchedule - График расписаний
 * @property {string} name.required - Наименование отчета, например "График работы Менеджеров"
 * @property {string} branch.required - id филиала из таблицы report_branches
 * @property {integer} menuindex - поле по которому будет происходить сортировка
 * @property {Array.<Schedules>} schedules - Расписание
 * @property {SchedulesResult.model} result - Результат
 */

const { model, Schema } = require('mongoose')

const scheduleSchema = new Schema({
  // заголовок
  name: {
    type: String,
    maxlength: 255,
    index: true
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'report_branches',
    require: true
  },
  // поле по которому будет происходить сортировка
  menuindex: {
    type: Number,
    index: true,
    default: 0
  },
  // расписание
  schedules: {
    type: Object,
    default: [
      {
        // Сотрудник
        employee: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
        // Номер сотрудника
        phone: ''
      }
    ]
  },
  // результат
  result: {
    type: Object,
    default: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('report_schedules', scheduleSchema)

/**
 * @typedef Schedules - Расписание
 * @description - Расписание
 * @property {string} employee - ФИО сотрудника
 * @property {string} monday - Понедельник
 * @property {string} tuesday - Вторник
 * @property {string} wednesday - Среда
 * @property {string} thursday - Четверг
 * @property {string} friday - Пятница
 * @property {string} saturday - Суббота
 * @property {string} sunday - Воскресенье
 * @property {string} phone - Номер сотрудника
 */

/**
 * @typedef SchedulesResult - Результат расписания
 * @description - Результат расписания
 * @property {string} monday - Понедельник
 * @property {string} tuesday - Вторник
 * @property {string} wednesday - Среда
 * @property {string} thursday - Четверг
 * @property {string} friday - Пятница
 * @property {string} saturday - Суббота
 * @property {string} sunday - Воскресенье
 */
