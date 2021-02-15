/**
 * Модель таблицы для свобных отчетов - итого
 */
export default [
  {
    field: 'lastText',
    headerName: 'Итого',
    pinned: 'left',
    cellStyle: {},
    width: 150
  },
  // Заявки
  {
    headerName: 'Заявки',
    children: [
      {
        field: 'requests.pkSeo',
        headerName: 'PK+SEO',
        cellStyle: {},
        width: 100,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'requests.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'requests.common_price',
        headerName: '₽ общая',
        cellStyle: {},
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      }
    ]
  },
  // Запись
  {
    headerName: 'Запись',
    children: [
      {
        field: 'order.count',
        headerName: 'кол-во',
        cellStyle: {},
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'order.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order.common_price',
        headerName: '₽ общая',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order.conversion',
        headerName: '%',
        cellStyle: {},
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' %'
        }
      }
    ]
  },
  // Пришёл в СЦ
  {
    name: 'Пришёл в СЦ',
    children: [
      {
        field: 'came_to_sc.count',
        headerName: 'кол-во',
        cellStyle: {},
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'came_to_sc.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'came_to_sc.common_price',
        headerName: '₽ общая',
        cellStyle: {
          color: 'red',
          fontSize: '14px !important',
          fontWeight: 700
        },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'came_to_sc.conversion',
        headerName: '%',
        cellStyle: {},
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' %'
        }
      }
    ]
  },
  // Клиент закрыт
  {
    headerName: 'Клиент закрыт',
    children: [
      {
        field: 'order_closed.count',
        headerName: 'кол-во',
        cellStyle: {},
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'order_closed.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order_closed.common_price',
        headerName: '₽ общая',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order_closed.conversion',
        headerName: '%',
        cellStyle: {},
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' %'
        }
      }
    ]
  },
  // Расходы
  {
    headerName: 'Расходы',
    children: [
      {
        field: 'common_expenses.balance',
        headerName: 'Баланс',
        cellStyle: { color: 'green' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.pk',
        headerName: 'РК',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.seo',
        headerName: 'SEO',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.common',
        headerName: 'Алока и т.д',
        cellStyle: {},
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      }
    ]
  },
  //
  {
    field: 'revenue',
    headerName: 'Выручка',
    cellStyle: {},
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'expenses',
    headerName: 'Расходы',
    cellStyle: {},
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'val',
    headerName: 'Вал',
    cellStyle: {},
    width: 90,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'orders',
    headerName: 'Заказы',
    cellStyle: {},
    width: 55,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value)
    }
  },
  {
    headerName: 'Ср. чек',
    field: 'wed_check',
    pinned: 'right',
    cellStyle: { color: 'red' },
    width: 110,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    headerName: 'Дельта',
    field: 'delta',
    pinned: 'right',
    cellStyle: { color: 'orange' },
    width: 110,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    headerName: 'Прибыль',
    field: 'profit',
    pinned: 'right',
    cellStyle: { color: 'magenta' },
    width: 110,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    headerName: 'СПЗ',
    field: 'spz',
    pinned: 'right',
    cellStyle: { color: 'blue', fontSize: '14px !important', fontWeight: 700 },
    width: 121,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  }
]
