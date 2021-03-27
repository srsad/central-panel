/**
 * Воркер для расчета второй части таблицы сводных листов (закрытые заказы)
 */

self.addEventListener('message', async (event) => {
  const items = event.data.arr
  const table = event.data.table

  const indexBrand = items[0].indexOf('Бренд') // индекс бренда
  const indexBranch = items[0].indexOf('Создан в локации') // индекс филиала
  const indexRevenue = items[0].indexOf('Оплачено') // индекс выручки
  const indexExpenses = items[0].indexOf('Себестоимость') // индекс расходов

  // алиасы для брендов
  const brandAlias = new Map([
    ['Hewlett-Packard', 'HP'],
    ['Microsoft', 'xBox'],
    ['Seagate', 'A-Data'],
    ['Western Digital', 'A-Data'],
    ['Kingston', 'A-Data'],
    ['Silicon Power', 'A-Data'],
    ['Transcend', 'A-Data'],
    ['SanDisk', 'A-Data'],
    ['QUMO', 'A-Data'],
    ['Vebratim', 'A-Data'],
    ['Verbatim', 'A-Data'],
    ['SiliconPower', 'A-Data']
  ])

  // алиасы для филиалов
  const branchAlias = new Map([
    ['мск армянский', 'мск сеславинская']
  ])

  items.shift() // удаляем первую строку

  for await (const item of table) {
    const brandName = item.brand.name.toLowerCase().trim()
    const branchName = item.branch.name.toLowerCase().trim()
    let revenue = 0 // выручка / сколько заплатили
    let expenses = 0 // расходы
    let orders = 0 // заказы

    for await (const row of items) {
      let brand = row[indexBrand].split(',')
      brand = brand[0].trim()
      // замена на alias
      if (brandAlias.get(brand)) brand = brandAlias.get(brand)
      brand = brand.toLowerCase()

      let branch = row[indexBranch].trim().toLowerCase()
      if (branchAlias.get(branch)) branch = branchAlias.get(branch)

      // все заказы
      if (brand === brandName && branchName === branch) {
        orders++
        revenue += row[indexRevenue]
        expenses += row[indexExpenses]
      }
    }
    item.revenue = Math.round(revenue)
    item.expenses = Math.round(expenses)
    item.orders = Math.round(orders)
  }
  self.postMessage(table)
})
