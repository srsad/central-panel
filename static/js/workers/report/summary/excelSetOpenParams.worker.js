/**
 * Воркер для расчета первой части таблицы сводных листов
 */

self.addEventListener('message', async (event) => {
  console.log('Запущен воркер расчета данных с открытыми заказами.')
  const items = event.data.arr
  const table = event.data.table
  for await (const item of table) {
    const brandName = item.brand.name.toLowerCase().trim()
    const branchName = item.branch.name.toLowerCase().trim()

    let allOrders = 0
    let cameToService = 0
    let closeOrders = 0

    for await (const row of items) {
      let brand = row[31].split(',')
      brand = brand[0].toLowerCase().trim()
      const branch = row[23].toLowerCase().trim()
      // все заказы текущего филиала
      if (brand === brandName && branchName === branch) {
        allOrders++
        // кто пришли в СЦ
        if (row[4].trim() !== 'Не пришел') cameToService++
        // закрытые заказы
        if (row[4].trim() !== 'Закрыт') closeOrders++
      }
    }
    item.order.count = Math.round(allOrders) // все заявки бренда
    item.came_to_sc.count = Math.round(cameToService) // кто пришли в СЦ
    item.order_closed.count = Math.round(closeOrders) // закрытые заказы
  }
  self.postMessage(table)
})
