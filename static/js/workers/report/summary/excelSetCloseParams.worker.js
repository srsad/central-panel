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

  items.shift() // удаляем первую строку

  for await (const item of table) {
    const brandName = item.brand.name.toLowerCase().trim()
    const branchName = item.branch.name.toLowerCase().trim()
    let revenue = 0 // выручка / сколько заплатили
    let expenses = 0 // расходы
    let orders = 0 // заказы

    for await (const row of items) {
      let brand = row[indexBrand].split(',')
      brand = brand[0].toLowerCase().trim()
      const branch = row[indexBranch].toLowerCase().trim()
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
