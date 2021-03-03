/**
 * Модель таблицы для свобных отчетов - общая
 */
export default [
  {
    field: 'branch.short_code',
    headerName: 'Филиал',
    width: 50,
    pinned: 'left',
    suppressSizeToFit: true,
    enableRowGroup: true,
    cellStyle: {},
    sortable: true
  },
  {
    field: 'brand.name',
    headerName: 'Бренд',
    pinned: 'left',
    width: 100,
    cellStyle: { fontSize: '14px !important', fontWeight: 700 },
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
          if (!params.value) return 0
          return ('' + params.value).replace(/\s/g, '') || 0
        }
      },
      {
        field: 'requests.chanel.seo',
        headerName: 'SEO',
        width: 50,
        sortable: true,
        editable: true,
        valueFormatter: (params) => {
          if (!params.value) return 0
          return ('' + params.value).replace(/\s/g, '') || 0
        }
      },
      {
        field: 'requests.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'requests.common_price',
        headerName: '₽ общая',
        cellStyle: {},
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
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
        cellStyle: { fontSize: '14px !important', fontWeight: 700 },
        width: 50,
        valueFormatter: (params) => {
          if (!params.value) return 0
          return ('' + params.value).replace(/\s/g, '') || 0
        }
      },
      {
        field: 'order.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'order.common_price',
        headerName: '₽ общая',
        cellStyle: {},
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'order.conversion',
        headerName: '%',
        cellStyle: {},
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          if (!params.value) return 0
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str)
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
        cellStyle: { fontSize: '14px !important', fontWeight: 700 },
        width: 50,
        valueFormatter: (params) => {
          if (!params.value) return 0
          return ('' + params.value).replace(/\s/g, '') || 0
        }
      },
      {
        field: 'came_to_sc.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
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
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'came_to_sc.conversion',
        headerName: '%',
        cellStyle: {},
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          if (!params.value) return 0
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str)
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
        cellStyle: { fontSize: '14px !important', fontWeight: 700 },
        width: 50,
        valueFormatter: (params) => {
          if (!params.value) return 0
          return ('' + params.value).replace(/\s/g, '') || 0
        }
      },
      {
        field: 'order_closed.traffik_price',
        headerName: '₽ трафик',
        cellStyle: {},
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'order_closed.common_price',
        headerName: '₽ общая',
        cellStyle: {},
        sortable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'order_closed.conversion',
        headerName: '%',
        cellStyle: {},
        sortable: true,
        width: 60,
        valueFormatter: (params) => {
          if (!params.value) return 0
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str)
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
        sortable: true,
        editable: true,
        cellStyle: { color: 'green' },
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'common_expenses.pk',
        headerName: 'РК',
        sortable: true,
        editable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'common_expenses.seo',
        headerName: 'SEO',
        sortable: true,
        editable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
        }
      },
      {
        field: 'common_expenses.common',
        headerName: 'Алока и т.д',
        sortable: true,
        editable: true,
        width: 80,
        valueFormatter: (params) => {
          if (!params.value) return 0 + ' ₽'
          const str = ('' + params.value).replace(/\s/g, '') || 0
          return parseInt(str) + ' ₽'
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
      if (!params.value) return 0 + ' ₽'
      const str = ('' + params.value).replace(/\s/g, '') || 0
      return parseInt(str) + ' ₽'
    }
  },
  {
    field: 'expenses',
    headerName: 'Расходы',
    sortable: true,
    editable: true,
    width: 100,
    valueFormatter: (params) => {
      if (!params.value) return 0 + ' ₽'
      const str = ('' + params.value).replace(/\s/g, '') || 0
      return parseInt(str) + ' ₽'
    }
  },
  {
    field: 'val',
    headerName: 'Вал',
    cellStyle: {},
    sortable: true,
    width: 70,
    valueFormatter: (params) => {
      if (!params.value) return 0 + ' ₽'
      const str = ('' + params.value).replace(/\s/g, '') || 0
      return parseInt(str) + ' ₽'
    }
  },
  {
    field: 'orders',
    headerName: 'Заказы',
    sortable: true,
    editable: true,
    width: 55,
    valueFormatter: (params) => {
      if (!params.value) return 0
      return ('' + params.value).replace(/\s/g, '') || 0
    }
  },
  {
    field: 'wed_check',
    headerName: 'Ср. чек',
    cellStyle: { color: 'red' },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      if (!params.value) return 0 + ' ₽'
      const str = ('' + params.value).replace(/\s/g, '') || 0
      return parseInt(str) + ' ₽'
    }
  },
  {
    field: 'delta',
    headerName: 'Дельта',
    cellStyle: { color: 'orange' },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      if (!params.value) return 0 + ' ₽'
      const str = ('' + params.value).replace(/\s/g, '') || 0
      return parseInt(str) + ' ₽'
    }
  },
  {
    field: 'profit',
    headerName: 'Прибыль',
    cellStyle: { color: 'magenta' },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      if (+params.value < 0) {
        params.colDef.cellStyle = { color: '#333' }
      } else {
        params.colDef.cellStyle = { color: 'magenta' }
      }
      if (!params.value) return 0 + ' ₽'
      const str = ('' + params.value).replace(/\s/g, '') || 0
      return parseInt(str) + ' ₽'
    }
  },
  {
    field: 'spz',
    headerName: 'СПЗ',
    cellStyle: { color: 'blue', fontSize: '14px !important', fontWeight: 700 },
    sortable: true,
    pinned: 'right',
    width: 100,
    valueFormatter: (params) => {
      if (!params.value) return 0 + ' ₽'
      const str = ('' + params.value).replace(/\s/g, '') || 0
      return parseInt(str) + ' ₽'
    }
  }
]
