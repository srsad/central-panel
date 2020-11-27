/**
 * Воркер для пересчета данных таблицы
 */

self.addEventListener('message', async (event) => {
  const table = event.data.table

  for await (const item of table) {
    // (c4+c5) | requests.chanel.pk+requests.chanel.seo
    const orderRang = +item.requests.chanel.pk + +item.requests.chanel.seo
    // (R4+S4+T4+U4) | common_expenses.balance+common_expenses.pk+common_expenses.seo+common_expenses.common
    // Расходы->Баланс + Расходы->РК + Расходы->SEO + Расходы->Алока и т.д
    const commonExpenses =
      +item.common_expenses.balance +
      +item.common_expenses.pk +
      +item.common_expenses.seo +
      +item.common_expenses.common

    // заявки
    const requestsTraffikPrice = Math.round((+item.common_expenses.balance + +item.common_expenses.seo) / +orderRang)
    const requestsCommonPrice = Math.round(commonExpenses / orderRang)
    item.requests.traffik_price = isFinite(requestsTraffikPrice) ? requestsTraffikPrice : 0
    item.requests.common_price = isFinite(requestsCommonPrice) ? requestsCommonPrice : 0
    // запись
    const orderTraffikPrice = Math.round(+item.common_expenses.balance / +item.order.count)
    const orderCommonPrice = Math.round(commonExpenses / +item.order.count)
    const orderConversion = Math.round(+item.order.count / orderRang * 100)
    item.order.traffik_price = isFinite(orderTraffikPrice) ? orderTraffikPrice : 0
    item.order.common_price = isFinite(orderCommonPrice) ? orderCommonPrice : 0
    item.order.conversion = isFinite(orderConversion) ? orderConversion : 0
    // Пришёл в СЦ
    const cameToSCTraffikPrice = Math.round(+item.common_expenses.balance / +item.came_to_sc.count)
    const cameToSCCommonPrice = Math.round(commonExpenses / +item.came_to_sc.count)
    const cameToSCConversion = Math.round(+item.came_to_sc.count / orderRang * 100)
    item.came_to_sc.traffik_price = isFinite(cameToSCTraffikPrice) ? cameToSCTraffikPrice : 0
    item.came_to_sc.common_price = isFinite(cameToSCCommonPrice) ? cameToSCCommonPrice : 0
    item.came_to_sc.conversion = isFinite(cameToSCConversion) ? cameToSCConversion : 0
    // Клиент закрыт
    const orderClosedTraffikPrice = Math.round(+item.common_expenses.balance / +item.order_closed.count)
    const orderClosedCommonPrice = Math.round(commonExpenses / +item.order_closed.count)
    const orderClosedConversion = Math.round(+item.order_closed.count / orderRang * 100)
    item.order_closed.traffik_price = isFinite(orderClosedTraffikPrice) ? orderClosedTraffikPrice : 0
    item.order_closed.common_price = isFinite(orderClosedCommonPrice) ? orderClosedCommonPrice : 0
    item.order_closed.conversion = isFinite(orderClosedConversion) ? orderClosedConversion : 0
    // вал
    item.val = Math.round(+item.revenue - +item.expenses) || 0
    // средний чек
    item.wed_check = Math.round(+item.val / +item.orders) || 0
    // дельта
    item.delta = Math.round(+item.wed_check - +item.came_to_sc.common_price) || 0
    // прибыль

    item.profit = Math.round(+item.val * 0.65 - +item.came_to_sc.count * 70 - commonExpenses) || 0
    const spz = Math.round(+item.profit / +item.orders)
    item.spz = isFinite(spz) ? spz : 0
  }

  self.postMessage(table)
})
