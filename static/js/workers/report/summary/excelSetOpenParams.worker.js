/**
 * Воркер для расчета первой части таблицы сводных листов (созданные заказы)
 */

self.addEventListener('message', async (event) => {
  console.log('Запущен воркер расчета данных с открытыми заказами.')
  const items = event.data.arr
  const table = event.data.table

  const indexBrand = items[0].indexOf('Бренд') // индекс бренда
  const indexBranch = items[0].indexOf('Создан в локации') // индекс филиала
  const indexStatus = items[0].indexOf('Статус') // индекс статуса

  items.shift() // удаляем первую строку

  for await (const item of table) {
    const brandName = item.brand.name.toLowerCase().trim()
    const branchName = item.branch.name.toLowerCase().trim()

    let allOrders = 0
    let cameToService = 0
    let closeOrders = 0

    for await (const row of items) {
      let brand = row[indexBrand].split(',')
      brand = brand[0].toLowerCase().trim()
      const branch = row[indexBranch].toLowerCase().trim()
      // все заказы текущего филиала
      if (brand === brandName && branchName === branch) {
        allOrders++
        // кто пришли в СЦ
        if (row[indexStatus].trim() !== 'Не пришел') cameToService++
        // закрытые заказы
        if (row[indexStatus].trim() === 'Закрыт') closeOrders++
      }
    }
    item.order.count = Math.round(allOrders) // все заявки бренда
    item.came_to_sc.count = Math.round(cameToService) // кто пришли в СЦ
    item.order_closed.count = Math.round(closeOrders) // закрытые заказы
  }
  self.postMessage(table)
})
