/**
 * Отчеты - сводная таблица
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
      require: true
    }
  ],
  period: {
    type: String,
    require: true
  },
  brands: [
    {
      brand: {
        type: Schema.Types.ObjectId,
        ref: 'report_brands'
      },
      // brand_name
      // бенем из report_brands
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
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('summory_reports', summoryReportSchema)
