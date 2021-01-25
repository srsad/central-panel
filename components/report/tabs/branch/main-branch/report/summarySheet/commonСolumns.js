/**
 * Модель таблицы для свобных отчетов - общая
 */
export default [
  {
    field: 'branch.code',
    headerName: 'Филиал',
    width: 50,
    pinned: 'left',
    suppressSizeToFit: true,
    enableRowGroup: true,
    cellStyle: { 'background-color': '#e7e7e7' },
    sortable: true
  },
  {
    field: 'brand.name',
    headerName: 'Сайт',
    pinned: 'left',
    width: 100,
    cellStyle: { 'background-color': '#e7e7e7' },
    sortable: true
  },
  {
    // field: 'brand.name',
    headerName: 'Заявки',
    children: [
      {
        field: 'requests.chanel.pk',
        headerName: 'PK',
        width: 50,
        sortable: true,
        editable: true,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'requests.chanel.seo',
        headerName: 'SEO',
        width: 50,
        sortable: true,
        editable: true,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'requests.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'requests.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      }
    ]
  },
  {
    headerName: 'Запись',
    children: [
      {
        field: 'order.count',
        headerName: 'кол-во',
        sortable: true,
        editable: true,
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'order.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order.conversion',
        headerName: 'конверсия %',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' %'
        }
      }
    ]
  },
  {
    headerName: 'Пришёл в СЦ',
    children: [
      {
        field: 'came_to_sc.count',
        headerName: 'кол-во',
        sortable: true,
        editable: true,
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'came_to_sc.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'came_to_sc.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7', color: 'red' },
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'came_to_sc.conversion',
        headerName: 'конверсия %',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' %'
        }
      }
    ]
  },
  {
    headerName: 'Клиент закрыт',
    children: [
      {
        field: 'order_closed.count',
        headerName: 'кол-во',
        sortable: true,
        editable: true,
        width: 50,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value)
        }
      },
      {
        field: 'order_closed.traffik_price',
        headerName: 'цена за трафик',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order_closed.common_price',
        headerName: 'цена общая',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'order_closed.conversion',
        headerName: 'конверсия %',
        cellStyle: { 'background-color': '#e7e7e7' },
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' %'
        }
      }
    ]
  },
  {
    headerName: 'Расходы',
    children: [
      {
        field: 'common_expenses.balance',
        headerName: 'Баланс',
        cellStyle: { color: 'green' },
        sortable: true,
        editable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.pk',
        headerName: 'РК',
        sortable: true,
        editable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.seo',
        headerName: 'SEO',
        sortable: true,
        editable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      },
      {
        field: 'common_expenses.common',
        headerName: 'Алока и т.д',
        sortable: true,
        editable: true,
        width: 80,
        valueFormatter: (params) => {
          return new Intl.NumberFormat().format(params.value) + ' ₽'
        }
      }
    ]
  },
  {
    field: 'revenue',
    headerName: 'Выручка',
    sortable: true,
    editable: true,
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'expenses',
    headerName: 'Расходы',
    sortable: true,
    editable: true,
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'val',
    headerName: 'Вал',
    cellStyle: { 'background-color': '#e7e7e7' },
    sortable: true,
    width: 70,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'orders',
    headerName: 'Заказы',
    sortable: true,
    editable: true,
    width: 55,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value)
    }
  },
  {
    field: 'wed_check',
    headerName: 'Ср. чек',
    cellStyle: { 'background-color': '#e7e7e7', color: 'red' },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'delta',
    headerName: 'Дельта',
    cellStyle: { 'background-color': '#e7e7e7', color: 'orange' },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'profit',
    headerName: 'Прибыль',
    cellStyle: { 'background-color': '#e7e7e7', color: 'magenta' },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      if (+params.value < 0) {
        params.colDef.cellStyle = {
          'background-color': '#eacece',
          color: '#333'
        }
      } else {
        params.colDef.cellStyle = {
          'background-color': '#e7e7e7',
          color: 'magenta'
        }
      }
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  },
  {
    field: 'spz',
    headerName: 'СПЗ',
    cellStyle: { 'background-color': '#e7e7e7', color: 'blue' },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      return new Intl.NumberFormat().format(params.value) + ' ₽'
    }
  }
]
