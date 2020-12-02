/**
 * Воркер для расчета пвторой части таблицы сводных листов
 */

self.addEventListener('message', async (event) => {
  const items = event.data.arr
  const table = event.data.table

  for await (const item of table) {
    const brandName = item.brand.name.toLowerCase().trim()
    const branchName = item.branch.name.toLowerCase().trim()
    let revenue = 0 // выручка / сколько заплатили
    let expenses = 0 // расходы
    let orders = 0 // заказы

    for await (const row of items) {
      let brand = row[31].split(',')
      brand = brand[0].toLowerCase().trim()
      const branch = row[23].toLowerCase().trim()
      // все заказы
      if (brand === brandName && branchName === branch) {
        orders++
        revenue += row[10]
        expenses += row[16]
      }
    }
    item.revenue = Math.round(revenue)
    item.expenses = Math.round(expenses)
    item.orders = Math.round(orders)
  }
  self.postMessage(table)
})
