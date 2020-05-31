/**
 * Модель доменных имен
 */

const { model, Schema } = require('mongoose')
// TODO добавить статус бана у гугла и яндекса
const domainSchema = new Schema({
  // приоритет
  priority: {
    type: Number,
    min: 0,
    max: 10
  },
  // исполнитель
  vendor: {
    type: String,
    maxlength: 255,
    index: true
  },
  // домен
  domain: {
    type: String,
    maxlength: 255,
    required: true,
    unique: true,
    index: true
  },
  // номер телефона по умолчанию
  phone_default: {
    type: String,
    default: '',
    maxlength: 32
  },
  // номер телефона/визитка
  phone: {
    type: String,
    default: '',
    maxlength: 32
  },
  // компании
  company: {
    type: String,
    default: 'R-Service',
    enum: ['R-Service', 'Impuls']
  },
  // наименование
  name: {
    type: String,
    maxlength: 255,
    index: true
  },
  // город
  city: {
    type: String,
    maxlength: 32,
    index: true
  },
  // бренд
  brand: {
    type: String,
    maxlength: 255,
    index: true
  },
  // описание
  description: {
    type: String,
    maxlength: 255
  },
  // статус доступен/нет
  status: {
    type: Boolean,
    default: true
  },
  // цвет заливки
  color: {
    type: String,
    maxlength: 16
  },
  // yandex метрика
  yametrika: {
    code: {
      type: String,
      default: ''
    },
    // id счетчика от yandex метрики
    id: {
      type: String,
      default: ''
    },
    // статус активер/не активен
    status: {
      type: Boolean,
      default: true
    }
  },
  // гугл аналитика
  analytics: {
    code: {
      type: String,
      default: ''
    },
    // id гугл аналитики
    id: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  // данные алоки
  alloka: {
    code: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  // данные Envybox
  envybox: {
    code: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  // пара логин/пароль от соцсетей
  accaunts: {
    login: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  },
  // адрес
  address: {
    type: String,
    maxlength: 255,
    default: ''
  },
  // время работы
  work_time: {
    type: String,
    maxlength: 255,
    default: ''
  },
  // скрипт карты
  map_script: {
    type: String,
    default: ''
  },
  // лог событий
  logs: {
    type: Array,
    default: []
  },
  // дополнительное поле для сортировки
  menuindex: {
    type: Number,
    default: 0,
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

module.exports = model('domains', domainSchema)
