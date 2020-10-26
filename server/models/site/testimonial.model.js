/**
 * Модель для отзывов
 */

const { model, Schema } = require('mongoose')

const testimonialSchema = new Schema({
  // адрес сайта
  site_url: {
    type: String,
    maxlength: 255,
    index: true,
    require: true
  },
  // бренд
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'report_brands',
    require: true
  },
  // Порядок
  sort_index: {
    type: Number,
    index: true,
    default: 0
  },
  // статус доступности, показывать/не показывать отзыв
  status: {
    type: Boolean,
    default: true
  },
  // ФИО
  fullname: {
    type: String,
    maxlength: 255,
    index: true,
    require: true
  },
  // Номер заказа
  order: {
    type: String,
    maxlength: 255,
    default: ''
  },
  // Дата
  date: {
    type: String,
    default: ''
  },
  // Устройство
  device: {
    type: String,
    maxlength: 255,
    default: ''
  },
  // Отзыв
  testemonial: {
    type: String,
    default: ''
  },
  // Оценка
  rating: {
    type: Number,
    default: 5
  },
  // Ответ администрации
  reply: {
    type: String,
    maxlength: 255,
    default: ''
  },
  // когда был создан
  created: {
    type: Date,
    default: Date.now
  },
  // когда был обновлен
  updated: {
    type: Date
  }
})

module.exports = model('site_testimonials', testimonialSchema)
