/**
 * Воркер для загрузки данных по таблице заявки + расходы из ексельки (для Лени)
 */

self.addEventListener('message', async (event) => {
  console.log('Запущен воркер для загрузки заявок + расходов')
  const items = event.data.arr // данные из ексельки
  const table = event.data.table // данные из таблицы

  // основная таблица
  for await (const item of table) {
    const branchID = item.branch._id
    const brandID = item.brand._id
    // данные из эксель
    for await (const row of items) {
      // все заказы текущего филиала
      if (row[8] === branchID && row[9] === brandID) {
        // pk + seo
        item.requests.chanel.pk = row[2]
        item.requests.chanel.seo = row[3]
        // Расходы
        item.common_expenses.balance = row[4]
        item.common_expenses.pk = row[5]
        item.common_expenses.seo = row[6]
        item.common_expenses.common = row[7]
      }
    }
  }

  self.postMessage(table)
})
