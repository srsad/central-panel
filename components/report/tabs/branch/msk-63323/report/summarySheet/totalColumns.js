/**
 * Модель таблицы для свобных отчетов - итого
 */
export default [
  {
    field: 'lastText',
    headerName: 'Итого',
    pinned: 'left',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 150
  },
  // Заявки
  {
    headerName: 'Заявки',
    children: [
      {
        field: 'requests.pkSeo',
        headerName: 'PK+SEO',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 100,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'requests.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'requests.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7' },
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
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'order.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order.conversion',
        headerName: 'конверсия %',
        cellStyle: { 'background-color': '#e7e7e7' },
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
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'came_to_sc.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'came_to_sc.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7', color: 'red' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'came_to_sc.conversion',
        headerName: 'конверсия %',
        cellStyle: { 'background-color': '#e7e7e7' },
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
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'order_closed.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order_closed.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order_closed.conversion',
        headerName: 'конверсия %',
        cellStyle: { 'background-color': '#e7e7e7' },
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
        cellStyle: { 'background-color': '#e7e7e7', color: 'green' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.pk',
        headerName: 'РК',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.seo',
        headerName: 'SEO',
        cellStyle: { 'background-color': '#e7e7e7' },
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.common',
        headerName: 'Алока и т.д',
        cellStyle: { 'background-color': '#e7e7e7' },
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
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'expenses',
    headerName: 'Расходы',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'val',
    headerName: 'Вал',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 70,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'orders',
    headerName: 'Заказы',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 55,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value)
    }
  },
  {
    headerName: 'Ср. чек',
    field: 'wed_check',
    pinned: 'right',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    headerName: 'Дельта',
    field: 'delta',
    pinned: 'right',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    headerName: 'Прибыль',
    field: 'profit',
    pinned: 'right',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    headerName: 'СПЗ',
    field: 'spz',
    pinned: 'right',
    cellStyle: { 'background-color': '#e7e7e7' },
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  }
]
