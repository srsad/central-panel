/**
 * Воркер для расчета первой части таблицы сводных листов (созданные заказы)
 */

self.addEventListener('message', async (event) => {
  console.log('Запущен воркер расчета данных с открытыми заказами.')
  const items = event.data.arr
  const table = event.data.table

  let indexBrand = items[0].indexOf('Бренд') // индекс бренда
  // если поле бренда нижене пустое, в ином случае ищим второе совподение
  if (!items[1][indexBrand]) {
    indexBrand = items[0].indexOf('Бренд', indexBrand + 1) // индекс бренда
  }
  const indexBranch = items[0].indexOf('Создан в локации') // индекс филиала
  const indexStatus = items[0].indexOf('Статус') // индекс статуса

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

    let allOrders = 0
    let cameToService = 0
    let closeOrders = 0

    for await (const row of items) {
      let brand = row[indexBrand].split(',')
      brand = brand[0].trim()
      // замена на alias
      if (brandAlias.get(brand)) brand = brandAlias.get(brand)
      brand = brand.toLowerCase()

      let branch = row[indexBranch].trim().toLowerCase()
      if (branchAlias.get(branch)) branch = branchAlias.get(branch)

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
