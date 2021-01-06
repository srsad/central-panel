/**
 * Модель таблицы для свобных отчетов - общая
 */
export default [
  {
    name: 'Филиал',
    prop: 'branch.name',
    size: 50,
    pin: 'colPinStart',
    readonly: true,
    sortable: true,
    cellTemplate: (createElement, props) => {
      return createElement('span', {}, getBranchCode(props.model.branch.name))
    }
  },
  {
    name: 'Сайт',
    prop: 'brand.name',
    size: 100,
    pin: 'colPinStart',
    readonly: true,
    sortable: true,
    cellTemplate: (createElement, props) => {
      return createElement('span', {}, props.model.brand.name)
    }
  },
  // Заявки
  {
    name: 'Заявки',
    children: [
      {
        name: 'PK',
        prop: 'requests.chanel.pk',
        size: 60,
        columnType: 'numeric',
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.requests.chanel.pk)
        }
      },
      {
        name: 'SEO',
        prop: 'requests.chanel.seo',
        size: 60, // BUG меняет размер предыдущей ячейки
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.requests.chanel.seo)
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
        sortable: true,
        cellTemplate: (createElement, props) => {
          return createElement(
            'span',
            {
              style: { width: '30px' }
            },
            props.model.order.count
          )
        },
        columnTemplate: (createElement, column) => {
          return createElement(
            'span',
            {
              style: { width: '30px' }
            },
            column.name
          )
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
        sortable: true,
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
        sortable: true,
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
        sortable: true,
        cellTemplate: (createElement, props) => {
          return createElement(
            'span',
            {
              style: { color: 'green' }
            },
            props.model.common_expenses.balance
          )
        },
        columnTemplate: (createElement, column) => {
          return createElement(
            'span',
            {
              style: { color: 'green' }
            },
            column.name
          )
        }
      },
      {
        name: 'РК',
        prop: 'common_expenses.pk',
        size: 80,
        sortable: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.common_expenses.pk)
        }
      },
      {
        name: 'SEO',
        prop: 'common_expenses.seo',
        size: 80,
        sortable: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.common_expenses.seo)
        }
      },
      {
        name: 'Алока и т.д',
        prop: 'common_expenses.common',
        size: 80,
        sortable: true,
        cellTemplate: (createElement, props) => {
          return createElement('span', {}, props.model.common_expenses.common)
        }
      }
    ]
  },
  //
  {
    name: 'Выручка',
    sortable: true,
    size: 100,
    prop: 'revenue'
  },
  {
    name: 'Расходы',
    sortable: true,
    size: 100,
    beforeValueFormatted: (event, instance) => {
      console.log('onBeforeValueFormatted', event, instance)
    },
    prop: 'expenses'
  },
  {
    name: 'Вал',
    prop: 'val',
    size: 100,
    sortable: true,
    readonly: true
  },
  {
    name: 'Заказы',
    sortable: true,
    prop: 'orders'
  },
  {
    name: 'Ср. чек',
    prop: 'wed_check',
    pin: 'colPinEnd',
    sortable: true,
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
    sortable: true,
    readonly: true,
    size: 80,
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
    sortable: true,
    readonly: true,
    size: 80,
    cellTemplate: (createElement, props) => {
      const cellClass = props.model.profit < 0 ? 'cellMinus' : ''
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
    sortable: true,
    columnType: 'numeric',
    readonly: true,
    size: 60,
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

function getBranchCode(key) {
  const map = new Map([
    ['СПБ 2-я Красноармейская', 'KRS'],
    ['СПБ Дмитровский', 'DMR'],
    ['МСК Новослободская', 'NVS'],
    ['МСК Армянский', 'ARM'],
    ['МСК Сеславинская', 'SES']
  ])
  return map.get(key) || '---'
}
