/**
 * Отчеты - план для менеджеров и инженеров
 * @typedef ManagerPlans - план для менеджеров и инженеров
 * @property {string} name.required - Наименование отчета
 * @property {Array.<ManagerPlanStructur>} managers - Структура для блока с менеджерами
 * @property {ManagerPlanSCStructur.model} service_center - Структура для блока с сервисного центра
 * @property {Array.<ManagerPlanStructur>} engineer - Структура для блока с инженерами
 */

const { model, Schema } = require('mongoose')

const reportManagerPlans = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  // менеджеры
  managers: {
    type: Array,
    default: [{
      fullname: {
        type: String,
        default: ''
      },
      // 1-5
      step_1_5: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 1-10
      step_1_10: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 1-15
      step_1_15: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-20
      step_16_20: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-25
      step_16_25: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-last
      step_16_last: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // итог
      result: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      }
    }]
  },
  // сервисного центра
  service_center: {
    type: Object,
    default: {
      fullname: {
        type: String,
        default: ''
      },
      // 1-5
      step_1_5: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 1-10
      step_1_10: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 1-15
      step_1_15: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-20
      step_16_20: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-25
      step_16_25: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-last
      step_16_last: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // итог
      result: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      }
    }
  },
  // инженеры
  engineer: {
    type: Array,
    default: [{
      fullname: {
        type: String,
        default: ''
      },
      // 1-5
      step_1_5: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 1-10
      step_1_10: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 1-15
      step_1_15: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-20
      step_16_20: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-25
      step_16_25: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // 16-last
      step_16_last: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      },
      // итог
      result: {
        type: Object,
        default: {
          average_bill: 0, // средний чек
          order_quantity: 0, // кол-во заказов
        }
      }
    }]
  },
  // ---
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('report_manager_plans', reportManagerPlans)

/**
 * @typedef ManagerPlanStructur - Общая структура для блока с менеджерами и инженерами
 * @description - Общая структура для блока с менеджерами и инженерами
 * @property {string} fullname - ФИО сотрудника
 * @property {ManagerItemsStepStructur.model} step_1_5 - этап с 1 по 5
 * @property {ManagerItemsStepStructur.model} step_1_10 - этап с 1 по 10
 * @property {ManagerItemsStepStructur.model} step_1_15 - этап с 1 по 15
 * @property {ManagerItemsStepStructur.model} step_16_20 - этап с 16 по 20
 * @property {ManagerItemsStepStructur.model} step_16_25 - этап с 16 по 25
 * @property {ManagerItemsStepStructur.model} step_16_last - этап с 16 по last
 */

/**
 * @typedef ManagerPlanSCStructur - Общая структура для блока с менеджерами и инженерами
 * @description - Общая структура для блока с менеджерами и инженерами
 * @property {ManagerItemsStepStructur.model} step_1_5 - этап с 1 по 5
 * @property {ManagerItemsStepStructur.model} step_1_10 - этап с 1 по 10
 * @property {ManagerItemsStepStructur.model} step_1_15 - этап с 1 по 15
 * @property {ManagerItemsStepStructur.model} step_16_20 - этап с 16 по 20
 * @property {ManagerItemsStepStructur.model} step_16_25 - этап с 16 по 25
 * @property {ManagerItemsStepStructur.model} step_16_last - этап с 16 по last
 */

/**
 * @typedef ManagerItemsStepStructur - Структура этапов
 * @description - Структура этапов
 * @property {integer} average_bill - средний чек
 * @property {integer} order_quantity - кол-во заказов
 */
