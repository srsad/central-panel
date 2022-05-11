/**
 * Воркер для подсчета итогов
 */

/* eslint-disable */

self.addEventListener('message', async (event) => {
  const table = event.data.table

  try {
    // обнуляем базовые данные
    table.total.requests.pkSeo = 0
    table.total.order.count = 0
    table.total.came_to_sc.count = 0
    table.total.order_closed.count = 0

    table.total.common_expenses.balance = 0
    table.total.common_expenses.pk = 0
    table.total.common_expenses.seo = 0
    table.total.common_expenses.common = 0

    table.total.revenue = 0
    table.total.expenses = 0
    table.total.orders = 0

    for await (const item of table.brands) {
      // заявки - реклама + сео
      table.total.requests.pkSeo += +item.requests.chanel.pk + +item.requests.chanel.seo
      table.total.order.count += +item.order.count // запись кол-во
      table.total.came_to_sc.count += +item.came_to_sc.count // пришел в СЦ
      table.total.order_closed.count += +item.order_closed.count // клиент закрыт

      // общие расходы
      table.total.common_expenses.balance += +item.common_expenses.balance // Баланс
      table.total.common_expenses.pk += +item.common_expenses.pk // РК
      table.total.common_expenses.seo += +item.common_expenses.seo // СЕО
      table.total.common_expenses.common += +item.common_expenses.common // Общие, алока и т.д

      table.total.revenue += +item.revenue // основная выручка
      table.total.expenses += +item.expenses // основные расходы
      table.total.orders += +item.orders // заказы
    }

    // блок расходы
    // баланс + сео
    const commonExpensesBalansAndSeo = +table.total.common_expenses.balance + +table.total.common_expenses.seo
    // все расхоты (баланс + рк + сео + общее)
    const allCommonExpenses = commonExpensesBalansAndSeo + +table.total.common_expenses.pk + +table.total.common_expenses.common

    // заявки
    const requestsTraffikPrice = Math.round(commonExpensesBalansAndSeo / +table.total.requests.pkSeo)
    const requestsCommonPrice = Math.round(allCommonExpenses / +table.total.requests.pkSeo)
    table.total.requests.traffik_price = isFinite(requestsTraffikPrice) ? requestsTraffikPrice : 0 // цена за трафик - (расходы_баланс_и_сео / заявки_реклама_и_сео)
    table.total.requests.common_price = isFinite(requestsCommonPrice) ? requestsCommonPrice : 0 // цена общая - (все_расходы / заявки_реклама_и_сео)
    // Запись
    table.total.order.traffik_price = Math.round(commonExpensesBalansAndSeo / +table.total.order.count) || 0 // цена за трафик - (расходы_рк_сео / кол-во_записанных)
    table.total.order.common_price = Math.round(allCommonExpenses / +table.total.order.count) || 0 // цена общая - (все_расходы / кол-во_записанных)
    const orderConversion = Math.round(+table.total.order.count / +table.total.requests.pkSeo * 100)
    table.total.order.conversion = isFinite(orderConversion) ? orderConversion : 0 // коверсия - (кол-во_записанных / заявки_реклама_и_сео)
    // пришел в СЦ
    table.total.came_to_sc.traffik_price = Math.round(commonExpensesBalansAndSeo / +table.total.came_to_sc.count) || 0 // цена за трафик - (расходы_рк_сео / кол-во_записанных)
    table.total.came_to_sc.common_price = Math.round(allCommonExpenses / +table.total.came_to_sc.count) || 0 // цена общая - (все_расходы / кол-во_записанных)
    const cameToSCConversion = Math.round(+table.total.came_to_sc.count / +table.total.requests.pkSeo * 100)
    table.total.came_to_sc.conversion = isFinite(cameToSCConversion) ? cameToSCConversion : 0 // коверсия - (кол-во_записанных / заявки_реклама_и_сео)
    // клиент закрыт
    table.total.order_closed.traffik_price = Math.round(commonExpensesBalansAndSeo / +table.total.order_closed.count) || 0 // цена за трафик - (расходы_рк_сео / кол-во_записанных)
    table.total.order_closed.common_price = Math.round(allCommonExpenses / +table.total.order_closed.count) || 0 // цена общая - (все_расходы / кол-во_записанных)
    const orderClosedConversion = Math.round(+table.total.order_closed.count / +table.total.requests.pkSeo * 100)
    table.total.order_closed.conversion = isFinite(orderClosedConversion) ? orderClosedConversion : 0 // коверсия - (кол-во_записанных / заявки_реклама_и_сео)

    // Вал - (выручка - расхооды)
    table.total.val = +table.total.revenue - +table.total.expenses
    // Ср. чек - (вал / заказы)
    const wedCheck = Math.round(+table.total.val / +table.total.orders)
    table.total.wed_check = isFinite(wedCheck) ? wedCheck : 0
    // Дельта - (Ср. чек - пришел_сц_ср._цена)
    const delta = Math.round(+table.total.wed_check / +table.total.came_to_sc.common_price)
    table.total.delta = isFinite(delta) ? delta : 0
    // прибыль - (вал * 0,65) - (пришел_сц_кол-вл * 70) - все_расходы
    const profit = Math.round(+table.total.val * 0.58) - +allCommonExpenses
    table.total.profit = isFinite(profit) ? profit : 0
    // спз - (прибыль / заказы)
    const spz = Math.round(+table.total.profit / +table.total.orders)
    table.total.spz = isFinite(spz) ? spz : 0
  } catch (e) {
    console.error('Не удалось посчитать итог сводном отчете')
  }

  self.postMessage(table)
})
