/**
 * Модель заявок - request
 * связать с пользователями
 */

const { model, Schema } = require('mongoose')

const crmRequest = new Schema({
  // тип заявки
  type_request: {
    type: Schema.Types.ObjectId,
    ref: 'crm_type_requests',
    require: true
  },
  // клиент- фио, номер, адрес
  client: {
    type: Schema.Types.ObjectId,
    ref: 'crm_clients'
  },
  // -----------
  // Изделие и неисправности
  // Тип устройства
  device_type: {
    type: Schema.Types.ObjectId,
    ref: 'crm_type_devices'
  },
  // Бренд
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'report_brands'
  },
  // Модель
  model: {
    type: String,
    index: true,
    require: true
  },
  // Серийный номер
  serial: {
    type: String,
    index: true,
    require: true
  },
  // Неисправности
  malfunctions: [{
    type: Schema.Types.ObjectId,
    ref: 'crm_malfunctions',
    require: true
  }],
  // Пароль
  password: {
    type: String,
    default: ''
  },
  // Внешний вид
  appearance: {
    type: String,
    default: 'Царапины, потертости, сколы, трещины'
  },
  // Комплектация - через зарятую
  packagelist: {
    type: String,
    default: ''
  },
  // -----------
  // Дополнительная информация
  // Заметки приемщика
  manager_notes: {
    type: String,
    maxlength: 255,
    require: true
  },
  // Объявлена бесплатная диагностика
  free_diagnostics: {
    type: Boolean,
    default: false
  },
  // Оригинальные запчасти
  original_parts: {
    type: Boolean,
    default: false
  },
  // Выдано подменное устройство
  replacement_device: {
    type: Boolean,
    default: false
  },
  // Срочно
  urgently: {
    type: Boolean,
    default: false
  },
  // Дата готовности
  will_done_at: {
    type: Date,
    require: true
  },
  // Предоплата
  prepayment: {
    type: Number,
    default: 0
  },
  // Менеджер
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // Ответственный исполнитель
  performer_in_charge: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // -----------
  // файлы + комментарии
  files: {
    type: Array,
    default: []
  },
  // -----------
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('crm_requests', crmRequest)
