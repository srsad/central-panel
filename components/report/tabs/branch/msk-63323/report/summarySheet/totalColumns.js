/**
 * Модель таблицы для свобных отчетов - итого
 */
export default [
  {
    name: 'Итого',
    prop: 'lastText',
    size: 180,
    pin: 'colPinStart',
    readonly: true,
    cellTemplate: (createElement) => {
      return createElement('span', {}, 'Итого')
    }
  },
  // Заявки
  {
    name: 'Заявки',
    children: [
      {
        name: 'PK + SEO',
        prop: 'requests.pkSeo',
        size: 120,
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.requests.pkSeo)
        }
      },
      {
        name: 'цена за трафик',
        prop: 'requests.traffik_price',
        readonly: true,
        size: 65,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.requests.traffik_price)
        }
      },
      {
        name: 'цена общая',
        prop: 'requests.common_price',
        readonly: true,
        size: 65,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.requests.common_price)
        }
      }
    ]
  },
  // Запись
  {
    name: 'Запись',
    children: [
      {
        name: 'кол-во',
        prop: 'order.count',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.order.count)
        }
      },
      {
        name: 'цена за трафик',
        prop: 'order.traffik_price',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.order.traffik_price)
        }
      },
      {
        name: 'цена общая',
        prop: 'order.common_price',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.order.common_price)
        }
      },
      {
        name: 'конверсия %',
        prop: 'order.conversion',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.order.conversion)
        }
      }
    ]
  },
  // Пришёл в СЦ
  {
    name: 'Пришёл в СЦ',
    children: [
      {
        name: 'кол-во',
        prop: 'came_to_sc.count',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.came_to_sc.count)
        }
      },
      {
        name: 'цена за трафик',
        prop: 'came_to_sc.traffik_price',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.came_to_sc.traffik_price)
        }
      },
      {
        name: 'цена общая',
        prop: 'came_to_sc.common_price',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement(
            'span',
            {
              style: { color: 'red' }
            },
            props.model.came_to_sc.common_price
          )
        },
        columnTemplate: (createElement, column) => {
          return createElement(
            'span',
            {
              style: { color: 'red' }
            },
            column.name
          )
        }
      },
      {
        name: 'конверсия %',
        prop: 'came_to_sc.conversion',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.came_to_sc.conversion)
        }
      }
    ]
  },
  // Клиент закрыт
  {
    name: 'Клиент закрыт',
    children: [
      {
        name: 'кол-во',
        prop: 'order_closed.count',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.order_closed.count)
        }
      },
      {
        name: 'цена за трафик',
        prop: 'order_closed.traffik_price',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement(
            'span',
            {},
            props.model.order_closed.traffik_price
          )
        }
      },
      {
        name: 'цена общая',
        prop: 'order_closed.common_price',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement(
            'span',
            {},
            props.model.order_closed.common_price
          )
        }
      },
      {
        name: 'конверсия %',
        prop: 'order_closed.conversion',
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.order_closed.conversion)
        }
      }
    ]
  },
  // Расходы
  {
    name: 'Расходы',
    children: [
      {
        name: 'Баланс',
        prop: 'common_expenses.balance',
        size: 80,
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement(
            'span',
            {
              style: { color: 'green' }
            },
            props.model.common_expenses.balance
          )
        }
      },
      {
        name: 'РК',
        prop: 'common_expenses.pk',
        size: 80,
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.common_expenses.pk)
        }
      },
      {
        name: 'SEO',
        prop: 'common_expenses.seo',
        size: 80,
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.common_expenses.seo)
        }
      },
      {
        name: 'Алока и т.д',
        prop: 'common_expenses.common',
        size: 80,
        readonly: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.common_expenses.common)
        }
      }
    ]
  },
  //
  {
    name: 'Выручка',
    prop: 'revenue',
    size: 100,
    readonly: true
  },
  {
    name: 'Расходы',
    prop: 'expenses',
    size: 100,
    readonly: true
  },
  {
    name: 'Вал',
    prop: 'val',
    size: 100,
    readonly: true
  },
  {
    name: 'Заказы',
    prop: 'orders',
    readonly: true
  },
  {
    name: 'Ср. чек',
    prop: 'wed_check',
    pin: 'colPinEnd',
    readonly: true,
    cellTemplate: (createElement, props) => {
      return createElement(
        'span',
        { style: { color: 'red' } },
        props.model.wed_check
      )
    },
    columnTemplate: (createElement, column) => {
      return createElement('span', { style: { color: 'red' } }, column.name)
    }
  },
  {
    name: 'Дельта',
    prop: 'delta',
    pin: 'colPinEnd',
    size: 80,
    readonly: true,
    cellTemplate: (createElement, props) => {
      return createElement(
        'span',
        { style: { color: 'orange' } },
        props.model.delta
      )
    },
    columnTemplate: (createElement, column) => {
      return createElement('span', { style: { color: 'orange' } }, column.name)
    }
  },
  {
    name: 'Прибыль',
    prop: 'profit',
    pin: 'colPinEnd',
    size: 80,
    readonly: true,
    cellTemplate: (createElement, props) => {
      const cellClass = props.model.requests.common_price > 0 ? 'cellMinus' : ''
      return createElement(
        'span',
        {
          class: cellClass,
          style: { color: '#f0f' }
        },
        props.model.profit
      )
    },
    columnTemplate: (createElement, column) => {
      return createElement('span', { style: { color: '#f0f' } }, column.name)
    }
  },
  {
    name: 'СПЗ',
    prop: 'spz',
    pin: 'colPinEnd',
    size: 60,
    readonly: true,
    cellTemplate: (createElement, props) => {
      return createElement(
        'span',
        { style: { color: '#00f' } },
        props.model.spz
      )
    },
    columnTemplate: (createElement, column) => {
      return createElement('span', { style: { color: '#00f' } }, column.name)
    }
  }
]
