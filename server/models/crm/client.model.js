/**
 * Модель клиента
 * связать с заявками - request
 */

const { model, Schema } = require('mongoose')

const crmClients = new Schema({
  // тип клиента, физ. лицо, компания
  ceditor: {
    type: String,
    default: '',
    index: true,
    enum: ['individual', 'company']
  },
  // ФИО/Название компании
  name: {
    type: String,
    require: true,
    index: true
  },
  // контактный номер
  phone: {
    type: Array,
    default: [{
      // тип - мобильный, рабочий, домашний
      contact_type: {
        type: String,
        default: 'mobile',
        enum: ['mobile', 'worker', 'home']
      },
      // номер телефона
      phone: {
        type: String,
        default: '',
      },
      // возможность отправки смс
      send_sms: {
        type: Boolean,
        default: false
      }
    }],
  },
  // email
  email: {
    type: Object,
    default: {
      email: {
        type: String,
        default: ''
      },
      send_email: {
        type: Boolean,
        default: false
      }
    },
  },
  // адрес, с координатами
  address: {
    type: Array,
    default: [
      {
        address: {
          type: String,
          default: ''
        },
        lat: {
          type: Number,
          default: ''
        },
        long: {
          type: Number,
          default: ''
        }
      }
    ],
  },
  // поставщик
  supplier: {
    type: Boolean,
    default: false
  },
  // конфликтный
  conflicted: {
    type: Boolean,
    default: false
  },
  // Скидочная карта
  discount_card: {
    type: Number,
    maxlength: 32,
    index: true,
    default: ''
  },
  // Скидка на услуги - %
  discount_services: {
    type: Number,
    default: 0
  },
  // TODO Скидка на материалы в Заказе и Счете
  // TODO Скидка на товары в Продажах
  // Примечание
  notes: {
    type: String,
    maxlength: 255,
    default: ''
  },
  // теги
  tags: {
    type: Array,
    index: true,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('crm_clients', crmClients)
