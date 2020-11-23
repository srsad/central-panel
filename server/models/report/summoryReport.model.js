/**
 * Отчеты - сводная таблица
 * @typedef ReportSummory - Объект с данными по бренду
 * @property {string} name.required - Наименование отчета
 * @property {Array.<string>} brands_id.required - id брендов, ссылка на коллекцию report_brands
 * @property {Array.<string>} branch_id.required - id филиалов, ссылка на коллекцию report_branches
 * @property {string} period.required - период в формате (YYYY-MM-DD YYYY-MM-DD)
 * @property {Brands.model} brands.required - массив со списком брендов и его сводными данными
 * @property {Total.model} total.required - объект с итогом
 */

const { model, Schema } = require('mongoose')

const summoryReportSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    index: true
  },
  brands_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'report_brands',
      require: true
    }
  ],
  branch_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'report_branches',
      require: true
    }
  ],
  period: {
    type: String,
    require: true
  },
  // массив с данными по брендам
  brands: [
    {
      // id бренда
      brand: {
        type: Schema.Types.ObjectId,
        ref: 'report_brands'
      },
      // id филиала
      branch: {
        type: Schema.Types.ObjectId,
        ref: 'report_branches'
      },
      // заявки
      requests: {
        // канал
        chanel: {
          pk: {
            type: Number,
            default: 0
          },
          seo: {
            type: Number,
            default: 0
          }
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: 0
        },
        // цена общая
        common_price: {
          type: Number,
          default: 0
        }
      },
      // Запись
      order: {
        // кол-во
        count: {
          type: Number,
          default: ''
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: ''
        },
        // цена общая
        common_price: {
          type: Number,
          default: ''
        },
        // конверсия %
        conversion: {
          type: Number,
          default: 0
        }
      },
      // пришел в СЦ
      came_to_sc: {
        // кол-во
        count: {
          type: Number,
          default: ''
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: ''
        },
        // цена общая
        common_price: {
          type: Number,
          default: ''
        },
        // конверсия %
        conversion: {
          type: Number,
          default: 0
        }
      },
      // клиент закрыт
      order_closed: {
        // кол-во
        count: {
          type: Number,
          default: ''
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: ''
        },
        // цена общая
        common_price: {
          type: Number,
          default: ''
        },
        // конверсия %
        conversion: {
          type: Number,
          default: 0
        }
      },
      // Расходы
      common_expenses: {
        // Баланс
        balance: {
          type: Number,
          default: 0
        },
        // РК
        pk: {
          type: Number,
          default: 0
        },
        // СЕО
        seo: {
          type: Number,
          default: 0
        },
        // Общие, алока и т.д
        common: {
          type: Number,
          default: 0
        }
      },
      // Выручка
      revenue: {
        type: Number,
        default: ''
      },
      // Расходы
      expenses: {
        type: Number,
        default: ''
      },
      // Вал
      val: {
        type: Number,
        default: 0
      },
      // Заказы
      orders: {
        type: Number,
        default: ''
      },
      // Ср. чек
      wed_check: {
        type: Number,
        default: ''
      },
      // Дельта
      delta: {
        type: Number,
        default: ''
      },
      // Прибыль
      profit: {
        type: Number,
        default: 0
      },
      // СПЗ
      spz: {
        type: Number,
        default: ''
      }
    }
  ],
  // итог
  total: {
    type: Object,
    default: {
      // заявки
      requests: {
        // канал
        pkSeo: {
          type: Number,
          default: 0
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: 0
        },
        // общая
        common_price: {
          type: Number,
          default: 0
        }
      },
      // Запись
      order: {
        // кол-во
        count: {
          type: Number,
          default: 0
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: 0
        },
        // цена общая
        common_price: {
          type: Number,
          default: 0
        },
        // конверсия %
        conversion: {
          type: Number,
          default: 0
        }
      },
      // пришел в СЦ
      came_to_sc: {
        // кол-во
        count: {
          type: Number,
          default: 0
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: 0
        },
        // цена общая
        common_price: {
          type: Number,
          default: 0
        },
        // конверсия %
        conversion: {
          type: Number,
          default: 0
        }
      },
      // клиент закрыт
      order_closed: {
        // кол-во
        count: {
          type: Number,
          default: 0
        },
        // цена за трафик
        traffik_price: {
          type: Number,
          default: 0
        },
        // цена общая
        common_price: {
          type: Number,
          default: 0
        },
        // конверсия %
        conversion: {
          type: Number,
          default: 0
        }
      },
      // Расходы
      common_expenses: {
        // Баланс
        balance: {
          type: Number,
          default: 0
        },
        // РК
        pk: {
          type: Number,
          default: 0
        },
        // СЕО
        seo: {
          type: Number,
          default: 0
        },
        // Общие, алока и т.д
        common: {
          type: Number,
          default: 0
        }
      },
      // Выручка
      revenue: {
        type: Number,
        default: 0
      },
      // Расходы
      expenses: {
        type: Number,
        default: 0
      },
      // Вал
      val: {
        type: Number,
        default: 0
      },
      // Заказы
      orders: {
        type: Number,
        default: 0
      },
      // Ср. чек
      wed_check: {
        type: Number,
        default: 0
      },
      // Дельта
      delta: {
        type: Number,
        default: 0
      },
      // Прибыль
      profit: {
        type: Number,
        default: 0
      },
      // СПЗ
      spz: {
        type: Number,
        default: 0
      }
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

module.exports = model('summory_reports', summoryReportSchema)

/**
 * @typedef Brands - Объект с данными по бренду
 * @property {string} brand.required - id бренда из коллекции report_brands
 * @property {string} branch.required - id филиала из коллекции  report_branches
 * @property {Requests.model} requests - Заявки
 * @property {CommonOrder.model} order - Запись
 * @property {CommonOrder.model} came_to_sc - пришел в СЦ
 * @property {CommonOrder.model} order_closed - клиент закрыт
 * @property {CommonExpenses.model} common_expenses - Расходы
 * @property {integer} revenue - выводы - выручка
 * @property {integer} expenses - выводы - расходы
 * @property {integer} val - выводы - вал
 * @property {integer} orders - выводы - заказы
 * @property {integer} wed_check - выводы - ср. чек
 * @property {integer} delta - выводы - дельта
 * @property {integer} profit - выводы - прибыль
 * @property {integer} spz - выводы - СПЗ
 */

/**
 * @typedef Requests - Заявки
 * @property {Chanel.model} chanel - канал трафика
 * @property {integer} traffik_price - цена за трафик
 * @property {integer} common_price - цена общая
 */

/**
 * @typedef Chanel - канал трафика
 * @property {integer} pk - количество людей пришедших по рекламе
 * @property {integer} seo - количество людей пришедших по seo
 */

/**
 * @typedef CommonOrder - Сводные данные по пол-ву людей и конверсии
 * @property {integer} count - количество людей
 * @property {integer} traffik_price - цена за трафик
 * @property {integer} common_price - цена общая
 * @property {integer} conversion - конверсия %
 */

/**
 * @typedef CommonExpenses - Расходы
 * @property {integer} balance - баланс
 * @property {integer} pk - реклама
 * @property {integer} seo - сео
 * @property {integer} common - общие
 */

/**
 * @typedef Total - Итог
 * @property {Requests.model} requests - Заявки
 * @property {CommonOrder.model} order - Запись
 * @property {CommonOrder.model} came_to_sc - пришел в СЦ
 * @property {CommonOrder.model} order_closed - клиент закрыт
 * @property {CommonExpenses.model} common_expenses - Расходы
 * @property {integer} revenue - выводы - выручка
 * @property {integer} expenses - выводы - расходы
 * @property {integer} val - выводы - вал
 * @property {integer} orders - выводы - заказы
 * @property {integer} wed_check - выводы - ср. чек
 * @property {integer} delta - выводы - дельта
 * @property {integer} profit - выводы - прибыль
 * @property {integer} spz - выводы - СПЗ
 */
