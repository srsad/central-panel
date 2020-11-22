<template>
  <div>
    <div v-if="tableData" style="display: inline-grid;">
      <div class="col-12">
        <h3>Филиал: {{ tableData.branch_id.name }}</h3>
        <!--  -->
        <el-button
          @click="saveTable"
          :loading="loading"
          class="saveTable"
          type="success"
          size="mini"
          icon="fa fa-floppy-o"
          title="Сохранить данные"
        />
        <el-popover
          placement="top-start"
          width="300"
          trigger="hover"
          content="Если галочка установлена, то будет происходит пересчет данных без запросов к API в ремонлайн"
        >
          <el-checkbox
            slot="reference"
            v-model="onlyRefresh"
            :disabled="loading"
            class="updateTable"
          />
        </el-popover>
        <el-button
          @click="updateTable"
          :loading="loading"
          class="updateTable2"
          type="primary"
          size="mini"
          icon="el-icon-refresh-left"
          title="Обновить данные"
        />
        <!--  -->
        <el-popconfirm
          @onConfirm="removeTable"
          title="Удалить отчет?"
          confirm-button-text="Да"
          confirm-button-type="success"
          cancel-button-type="default"
          cancel-button-text="Нет, спасибо"
        >
          <el-button
            slot="reference"
            :loading="loading"
            class="removeTable pt-10 pointer"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            title="Удалить отчет"
          />
        </el-popconfirm>
        <!--  -->
        <el-popover
          placement="top-start"
          trigger="hover"
          content="Загрузить данные из excel. Созданные заказы."
        >
          <label
            slot="reference"
            @click="() => (excelListType = 'excelSetOpenParams')"
          >
            <span class="el-button el-button--default el-button--mini">
              <i class="el-icon-download"></i>
            </span>
            <input
              @change="uploadFromExcel"
              :disabled="loading"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              style="display:none"
            />
          </label>
        </el-popover>
        <!--  -->
        <el-popover
          placement="top-start"
          trigger="hover"
          content="Загрузить данные из excel. Закрытые заказы."
        >
          <label
            slot="reference"
            @click="() => (excelListType = 'excelSetCloseParams')"
          >
            <span class="el-button el-button--info el-button--mini">
              <i class="el-icon-download"></i>
            </span>
            <input
              @change="uploadFromExcel"
              :disabled="loading"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              style="display:none"
            />
          </label>
        </el-popover>
        <!--  -->
      </div>
      <!--  -->
      <el-table :data="tableData.brands">
        <el-table-column
          prop="brand.name"
          label="Сайт"
          width="150"
          fixed="left"
        >
          <template slot-scope="scope">
            {{ scope.row.brand.name }}
            <!-- Обновление бренда отчета -->
            <el-button
              @click="updateRowTable(scope.row)"
              :disabled="true"
              :loading="loading"
              class="updateTableRow"
              type="primary"
              size="mini"
              icon="el-icon-refresh"
              title="Обновить данные этого бренда"
            />
            <!-- /Обновление бренда отчета -->
            <!-- Удаление бренда в данном отчете -->
            <el-popconfirm
              @onConfirm="removeTableRow(scope.row)"
              title="Удалить бренд из отчета?"
              confirm-button-text="Да"
              confirm-button-type="success"
              cancel-button-type="default"
              cancel-button-text="Нет, спасибо"
            >
              <el-button
                slot="reference"
                :loading="loading"
                class="removeTableRow pt-10 pointer"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                title="Удалить бренд"
              />
            </el-popconfirm>
            <!-- /Удаление бренда в данном отчете -->
          </template>
        </el-table-column>
        <el-table-column label="Канал" width="70">
          <template>
            PK <br />
            SEO
          </template>
        </el-table-column>
        <!--  -->
        <el-table-column label="Заявки">
          <el-table-column label="кол-во">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.requests.chanel.pk"
                :disabled="loading"
                size="mini"
              />
              <br />
              <el-input
                v-model="scope.row.requests.chanel.seo"
                :disabled="loading"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="цена за трафик">
            <template slot-scope="scope">
              {{ scope.row.requests.traffik_price }} ₽
            </template>
          </el-table-column>
          <el-table-column label="цена общая">
            <template slot-scope="scope">
              {{ scope.row.requests.common_price }} ₽
            </template>
          </el-table-column>
        </el-table-column>
        <!--  -->
        <el-table-column label="Запись">
          <el-table-column label="кол-во">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.order.count"
                :disabled="loading"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="цена за трафик">
            <template slot-scope="scope">
              {{ priceMask(scope.row.order.traffik_price) }}
            </template>
          </el-table-column>
          <el-table-column label="цена общая">
            <template slot-scope="scope">
              {{ priceMask(scope.row.order.common_price) }}
            </template>
          </el-table-column>
          <el-table-column label="конверсия %" width="100px">
            <template slot-scope="scope">
              {{ scope.row.order.conversion }} %
            </template>
          </el-table-column>
        </el-table-column>
        <!--  -->
        <el-table-column label="Пришёл в СЦ">
          <el-table-column label="кол-во">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.came_to_sc.count"
                :disabled="loading"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="цена за трафик">
            <template slot-scope="scope">
              {{ priceMask(scope.row.came_to_sc.traffik_price) }}
            </template>
          </el-table-column>
          <el-table-column label="цена общая">
            <template slot-scope="scope">
              {{ priceMask(scope.row.came_to_sc.common_price) }}
            </template>
          </el-table-column>
          <el-table-column label="конверсия %" width="100px">
            <template slot-scope="scope">
              {{ scope.row.came_to_sc.conversion }} %
            </template>
          </el-table-column>
        </el-table-column>
        <!--  -->
        <el-table-column label="Клиент закрыт">
          <el-table-column label="кол-во">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.order_closed.count"
                :disabled="loading"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="цена за трафик">
            <template slot-scope="scope">
              {{ priceMask(scope.row.order_closed.traffik_price) }}
            </template>
          </el-table-column>
          <el-table-column label="цена общая">
            <template slot-scope="scope">
              {{ priceMask(scope.row.order_closed.common_price) }}
            </template>
          </el-table-column>
          <el-table-column label="конверсия %" width="100px">
            <template slot-scope="scope">
              {{ scope.row.order_closed.conversion }} %
            </template>
          </el-table-column>
        </el-table-column>
        <!--  -->
        <el-table-column label="Расходы">
          <el-table-column label="Баланс" width="100px">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.common_expenses.balance"
                :disabled="loading"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="РК">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.common_expenses.pk"
                :disabled="loading"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column label="SEO">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.common_expenses.seo"
                :disabled="loading"
                size="mini"
              />
              <!-- {{ priceMask(scope.row.common_expenses.seo) }} -->
            </template>
          </el-table-column>
          <el-table-column label="Алока и т.д">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.common_expenses.common"
                :disabled="loading"
                size="mini"
              />
              <!-- {{ scope.row.common_expenses.common }} % -->
            </template>
          </el-table-column>
        </el-table-column>
        <!--  -->
        <el-table-column prop="revenue" label="Выручка">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.revenue"
              :disabled="loading"
              size="mini"
            />
          </template>
        </el-table-column>
        <el-table-column prop="expenses" label="Расходы">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.expenses"
              :disabled="loading"
              size="mini"
            />
          </template>
        </el-table-column>
        <el-table-column prop="val" label="Вал" />
        <el-table-column prop="orders" label="Заказы">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.orders"
              :disabled="loading"
              size="mini"
            />
          </template>
        </el-table-column>
        <el-table-column prop="wed_check" fixed="right" label="Ср. чек" />
        <el-table-column prop="delta" fixed="right" label="Дельта" />
        <el-table-column prop="profit" fixed="right" label="Прибыль" />
        <el-table-column prop="spz" fixed="right" label="СПЗ" />
        <!--  -->
      </el-table>
      <!--  -->
      <div class="text-center mt-20 mb-10 d-none">
        <el-button :loading="loading" type="info" icon="el-icon-edit">
          Изменить список брендов
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
/* eslint-disable prettier/prettier */
import Rem from '~/utils/remonline.js'
const rem = new Rem(process.env.REMONLINE_API_KEY, true)

export default {
  data() {
    return {
      loading: false,
      /**
       * тип загружаемого дакумента, для открытых или закрытых заказов
       * excelSetOpenParams - открытые
       * excelSetCloseParams - закрытые
       */
      excelListType: 'excelSetOpenParams',
      excelList: [], // загружаемоя екселька
      onlyRefresh: true // без получения новых данных из ремонлайн
    }
  },
  computed: {
    tableData() {
      return this.$store.getters['report/summary/report']
    }
  },
  methods: {
    priceMask(val) {
      return val ? `${val} ₽` : '-'
    },
    /**
     * Удаление отчета
     */
    async removeTable() {
      this.loading = true
      try {
        await this.$axios.$delete(
          '/api/v1/report/summory/remove/' + this.tableData._id
        )
        this.$notify({
          message: 'Отчет успушно удален!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('report/summary/SET_REPORT', null)
        this.$store.dispatch('report/summary/fetchItems')
      } catch (e) {
        console.error('Не удалось удалить отчет', e)
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * Загрузка двнных из ремонлайн - все записи
     */
    async getAllOrders(brandName) {
      this.loading = true
      try {
        // дата
        const created = this.tableData.period.split(' ')
        created[0] = new Date(created[0] + ' 00:00:00').getTime()
        created[1] = new Date(created[1] + ' 00:00:00').getTime()
        // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
        const filter = [
          `created_at[]=${created[0]}`,
          `created_at[]=${created[1]}`,
          `branches[]=${this.tableData.branch_id.branch_id}`,
          `brands[]=${brandName}`,
          'statuses[]=133616', // Доставлен в СЦ
          'statuses[]=134374', // Предзаказ
          'statuses[]=137224', // На заборе
          'statuses[]=137777', // Предзаказ (Забор)
          'statuses[]=138350', // Предзаказ (Выезд)
          'statuses[]=239339', // Предзаказ (Покупка)
          'statuses[]=287386', // Передан исполнителю
          'statuses[]=133722', // Продиагностирован
          'statuses[]=134372', // Согласован
          'statuses[]=152119', // Принят на диагностику
          'statuses[]=158628', // На аутсорсе
          'statuses[]=219345', // В работе
          'statuses[]=133619', // На согласовании
          'statuses[]=133620', // Отремонтирован
          'statuses[]=134373', // Отказ СХ
          'statuses[]=151377', // Отказ Менеджер
          'statuses[]=154405', // Отвозим клиенту
          'statuses[]=151384', // Закрыт
          'statuses[]=162791', // Выкупил СЦ
          'statuses[]=198277', // Закрыт (Отказ СХ)
          'statuses[]=198285', // Закрыт (Отказ Менеджер)
          'statuses[]=241717', // Для открытия
          'statuses[]=192751', // Не пришел
        ]
        const orders = await rem.getOrders(`&${filter.join('&')}`)
        // console.log('tableData.period', this.tableData.period, brandName, '-', orders.count)
        return orders.count
      } catch (e) {
        this.$store.commit('SET_ERROR', 'Не удалось получить данные от remonline. Попробуйте по позже повторить данное действие.')
      } finally {
        this.loading = false
      }
    },

    /**
     * Загрузка двнных из ремонлайн - Пришел в сц
     */
    async cameToService(brandName) {
      this.loading = true
      try {
        // дата
        const created = this.tableData.period.split(' ')
        created[0] = new Date(created[0] + ' 00:00:00').getTime()
        created[1] = new Date(created[1] + ' 00:00:00').getTime()
        // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
        const filter = [
          `created_at[]=${created[0]}`,
          `created_at[]=${created[1]}`,
          `branches[]=${this.tableData.branch_id.branch_id}`,
          `brands[]=${brandName}`,
          'statuses[]=133616', // Доставлен в СЦ
          // 'statuses[]=134374', // Предзаказ
          'statuses[]=137224', // На заборе
          // 'statuses[]=137777', // Предзаказ (Забор)
          // 'statuses[]=138350', // Предзаказ (Выезд)
          // 'statuses[]=239339', // Предзаказ (Покупка)
          'statuses[]=287386', // Передан исполнителю
          'statuses[]=133722', // Продиагностирован
          'statuses[]=134372', // Согласован
          'statuses[]=152119', // Принят на диагностику
          'statuses[]=158628', // На аутсорсе
          'statuses[]=219345', // В работе
          'statuses[]=133619', // На согласовании
          'statuses[]=133620', // Отремонтирован
          'statuses[]=134373', // Отказ СХ
          'statuses[]=151377', // Отказ Менеджер
          'statuses[]=154405', // Отвозим клиенту
          'statuses[]=151384', // Закрыт
          'statuses[]=162791', // Выкупил СЦ
          'statuses[]=198277', // Закрыт (Отказ СХ)
          'statuses[]=198285', // Закрыт (Отказ Менеджер)
          'statuses[]=241717', // Для открытия
          // 'statuses[]=192751', // Не пришел
          // 'page=1',
        ]
        // 1598907600000, 1601499599999
        // 1598918400000, 1601424000000
        const orders = await rem.getOrders(`&${filter.join('&')}`)

        return orders.count
      } catch (e) {
        this.$store.commit('SET_ERROR', 'Не удалось получить данные от remonline. Попробуйте по позже повторить данное действие.')
      } finally {
        this.loading = false
      }
    },
    /**
     * Загрузка двнных из ремонлайн - Клиент закрыт
     */
    async closeOrders(brandName) {
      this.loading = true
      try {
        // дата
        const created = this.tableData.period.split(' ')
        created[0] = new Date(created[0] + ' 00:00:00').getTime()
        created[1] = new Date(created[1] + ' 00:00:00').getTime()
        // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
        const filter = [
          `created_at[]=${created[0]}`,
          `created_at[]=${created[1]}`,
          `branches[]=${this.tableData.branch_id.branch_id}`,
          `brands[]=${brandName}`,
          'statuses[]=151384', // Закрыт
          // 'page=1',
        ]
        const orders = await rem.getOrders(`&${filter.join('&')}`)
        // for (const order of orders.data) {
        //   console.log('order brand', order.brand)
        // }
        // console.log('orders', orders)
        // console.log('tableData.period', this.tableData.period, brandName, '-', orders.count)
        return orders.count
      } catch (e) {
        this.$store.commit('SET_ERROR', 'Не удалось получить данные от remonline. Попробуйте по позже повторить данное действие.')
      } finally {
        this.loading = false
      }
    },

    /**
     * Получение выручки расходов и заказов
     */
    async getProceedsExpensesAndExpenses(brandName) {
      this.loading = true
      try {
        let page = 1 // изначально делаем только один проод
        let revenue = 0 // выручка / сколько заплатили
        let expenses = 0 // расходы
        let orders = 0 // заказы

        for (let i = 1; i <= page; i++) {
          const created = this.tableData.period.split(' ')
          created[0] = new Date(created[0] + ' 00:00:00').getTime()
          created[1] = new Date(created[1] + ' 00:00:00').getTime()

          const filter = [
            `created_at[]=${created[0]}`,
            `created_at[]=${created[1]}`,
            `branches[]=${this.tableData.branch_id.branch_id}`,
            `brands[]=${brandName}`,
            'statuses[]=151384', // Закрыт
            'statuses[]=162791', // Выкупил СЦ
            'statuses[]=198277', // Закрыт (Отказ СХ)
            'statuses[]=198285', // Закрыт (Отказ Менеджер)
            'statuses[]=241717', // Для открытия
            `page=${i}`,
          ]
          const allOrders = await rem.getOrders(`&${filter.join('&')}`)

          revenue += allOrders.data.reduce((acc, { payed }) => acc + payed, 0)
          allOrders.data.forEach((el) => {
            expenses += el.parts.reduce((acc, { price }) => acc + price, 0)
          })

          orders = allOrders.count

          // если это первая итерация
          if (i === 1 && allOrders.count > 50) {
            page = Math.ceil(allOrders.count / 50)
          }
        }
        // console.log({ brandName, revenue, expenses, orders })
        return { revenue, expenses, orders }
      } catch (e) {
        this.$store.commit('SET_ERROR', 'Не удалось получить данные от remonline, чтоб посчитать выручку расходы и заказы')
      } finally {
        this.loading = false
      }
    },

    /**
     * Обновление отчета
     */
    async updateTable() {
      this.loading = true

      for await (const item of this.tableData.brands) {
        // если надо подтягивать данные из ремонлайн
        if (!this.onlyRefresh) {
          const allOrders = await this.getAllOrders(item.brand.name) // все заявки бренда
          const cameToService = await this.cameToService(item.brand.name) // те кто пришли в СЦ
          const closeOrders = await this.closeOrders(item.brand.name) // закрытые заказы

          item.order.count = allOrders
          item.came_to_sc.count = cameToService
          item.order_closed.count = closeOrders

          const  { revenue, expenses, orders } = await this.getProceedsExpensesAndExpenses(item.brand.name)
          item.revenue = revenue // выручка / сколько заплатили
          item.expenses = expenses // расходы
          item.orders = orders // заказы
        }

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
        const orderTraffikPrice = Math.round(+item.common_expenses.balance / item.order.count)
        const orderCommonPrice = Math.round(commonExpenses / item.order.count)
        const orderConversion = Math.round((+item.order.count / orderRang) * 100)
        item.order.traffik_price = isFinite(orderTraffikPrice) ? orderTraffikPrice : 0
        item.order.common_price = isFinite(orderCommonPrice) ? orderCommonPrice : 0
        item.order.conversion = isFinite(orderConversion) ? orderConversion : 0
        // Пришёл в СЦ
        const cameToSCTraffikPrice = Math.round(+item.common_expenses.balance / item.came_to_sc.count)
        const cameToSCCommonPrice = Math.round(commonExpenses / item.came_to_sc.count)
        const cameToSCConversion = Math.round((+item.came_to_sc.count / orderRang) * 100)
        item.came_to_sc.traffik_price = isFinite(cameToSCTraffikPrice) ? cameToSCTraffikPrice : 0
        item.came_to_sc.common_price = isFinite(cameToSCCommonPrice) ? cameToSCCommonPrice : 0
        item.came_to_sc.conversion = isFinite(cameToSCConversion) ? cameToSCConversion : 0
        // Клиент закрыт
        const orderClosedTraffikPrice = Math.round(+item.common_expenses.balance / item.order_closed.count)
        const orderClosedCommonPrice = Math.round(commonExpenses / item.order_closed.count)
        const orderClosedConversion = Math.round((+item.order_closed.count / orderRang) * 100)
        item.order_closed.traffik_price = isFinite(orderClosedTraffikPrice) ? orderClosedTraffikPrice : 0
        item.order_closed.common_price = isFinite(orderClosedCommonPrice) ? orderClosedCommonPrice : 0
        item.order_closed.conversion = isFinite(orderClosedConversion) ? orderClosedConversion : 0
        // вал
        item.val = Math.round(+item.revenue - item.expenses) || 0
        // средний чек
        item.wed_check = Math.round(+item.val / item.orders) || 0
        // дельта
        item.delta = Math.round(+item.wed_check - item.came_to_sc.common_price) || 0
        // прибыль

        item.profit = Math.round(+item.val * 0.65 - +item.came_to_sc.count * 70 - commonExpenses) || 0
        const spz = Math.round(+item.profit / item.orders)
        item.spz = isFinite(spz) ? spz : 0
      }
      try {
        await this.$axios.$put(
          '/api/v1/report/summory/update/' + this.tableData._id,
          this.tableData
        )
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message, { root: true })
      } finally {
        this.loading = false
      }

      /*
        {
          "brands_id": [
            "5f0b0169969ad75f902e7a3e",
            "5f0b06a2969ad75f902e7a3f",
            "5f0b09ca969ad75f902e7a41",
            "5f0b0aec969ad75f902e7a42"
          ],
          "_id": "5f14499affeea60c3cac06db",
          "name": "Отчет за - 07/2020",
          "period": "2020-07-01 2020-07-31",
          "brands": [
            {
              // заявки
              "requests": {
                "chanel": {
                  "pk": 0,
                  "seo": 0
                },
                // цена за трафик
                "traffik_price": 0, (common_expenses.balance+common_expenses.seo)/(requests.chanel.pk+requests.chanel.seo)
                // цена общая
                "common_price": 0 (common_expenses.balance+common_expenses.pk+common_expenses.seo+common_expenses.common)/(requests.chanel.pk+requests.chanel.seo)
              },
              // Запись
              "order": {
                "count": null, // + запись_кол-во
                "traffik_price": null, // common_expenses.balance/order.count
                "common_price": null, // (common_expenses.balance+common_expenses.pk+common_expenses.seo+common_expenses.common)/order.count
                "conversion": 0 // order.count/(requests.chanel.pk+requests.chanel.seo)
              },
              // Пришёл в СЦ
              "came_to_sc": {
                "count": null, // + пришёл_в_СЦ_кол-во
                "traffik_price": null, // common_expenses.balance/came_to_sc.count
                "common_price": null, // (common_expenses.balance+common_expenses.pk+common_expenses.seo+common_expenses.common)/came_to_sc.count
                "conversion": 0 // came_to_sc.count/(requests.chanel.pk+requests.chanel.seo)
              },
              // Клиент закрыт
              "order_closed": {
                "count": null, // клиент_закрыт_кол-во
                "traffik_price": null, // common_expenses.balance/order_closed.count
                "common_price": null, // (common_expenses.balance+common_expenses.pk+common_expenses.seo+common_expenses.common)/order_closed.count
                "conversion": 0 // order_closed.count/(requests.chanel.pk+requests.chanel.seo)
              },
              // Расходы
              "common_expenses": {
                "balance": 0, // common_expenses.balance
                "pk": 0, // common_expenses.pk
                "seo": 0, // common_expenses.seo
                "common": 0 // common_expenses.common
              },
              "revenue": null, // выручка
              "expenses": null, // расходы
              "val": 0, // выручка-расходы
              "orders": null, // заказы
              "wed_check": null, // (val/orders)
              "delta": null, // wed_check - came_to_sc.common_price
              "profit": 0, // (val*0,65)-(came_to_sc.count*70)-(common_expenses.balance+common_expenses.pk+common_expenses.seo+common_expenses.common)
              "spz": null, // profit/orders
              "_id": "5f14499affeea60c3cac06dc",
              "brand": {
                "_id": "5f0b0169969ad75f902e7a3e",
                "name": "Sony"
              }
            },
            {
              "requests": {
                "chanel": {
                  "pk": 0,
                  "seo": 0
                },
                "traffik_price": 0,
                "common_price": 0
              },
              "order": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "came_to_sc": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "order_closed": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "common_expenses": {
                "balance": 0,
                "pk": 0,
                "seo": 0,
                "common": 0
              },
              "revenue": null,
              "expenses": null,
              "val": 0,
              "orders": null,
              "wed_check": null,
              "delta": null,
              "profit": 0,
              "spz": null,
              "_id": "5f14499affeea60c3cac06dd",
              "brand": {
                "_id": "5f0b06a2969ad75f902e7a3f",
                "name": "Samsung"
              }
            },
            {
              "requests": {
                "chanel": {
                  "pk": 0,
                  "seo": 0
                },
                "traffik_price": 0,
                "common_price": 0
              },
              "order": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "came_to_sc": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "order_closed": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "common_expenses": {
                "balance": 0,
                "pk": 0,
                "seo": 0,
                "common": 0
              },
              "revenue": null,
              "expenses": null,
              "val": 0,
              "orders": null,
              "wed_check": null,
              "delta": null,
              "profit": 0,
              "spz": null,
              "_id": "5f14499affeea60c3cac06de",
              "brand": {
                "_id": "5f0b09ca969ad75f902e7a41",
                "name": "Asus"
              }
            },
            {
              "requests": {
                "chanel": {
                  "pk": 0,
                  "seo": 0
                },
                "traffik_price": 0,
                "common_price": 0
              },
              "order": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "came_to_sc": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "order_closed": {
                "count": null,
                "traffik_price": null,
                "common_price": null,
                "conversion": 0
              },
              "common_expenses": {
                "balance": 0,
                "pk": 0,
                "seo": 0,
                "common": 0
              },
              "revenue": null,
              "expenses": null,
              "val": 0,
              "orders": null,
              "wed_check": null,
              "delta": null,
              "profit": 0,
              "spz": null,
              "_id": "5f14499affeea60c3cac06df",
              "brand": {
                "_id": "5f0b0aec969ad75f902e7a42",
                "name": "Apple"
              }
            }
          ],
          "created": "2020-07-19T13:24:42.057Z",
          "__v": 0
        }
      */
    },

    /**
     * TODO Обновление данных одного бренда
     */
    // TODO Обновление данных одного бренда
    updateRowTable(row) {
      console.log('updateRowTable', row)
    },
    /**
     * Сохранить текущее состояние таблицы
     */
    async saveTable() {
      this.loading = true
      try {
        await this.$axios.$put(
          '/api/v1/report/summory/update/' + this.tableData._id,
          this.tableData
        )
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    /**
     * Удалить бренд из отчета
     */
    async removeTableRow(row) {
      this.loading = true
      try {
        const report = JSON.parse(JSON.stringify(this.tableData))
        // удаляем бренд
        report.brands_id = report.brands_id.filter((el) => el !== row.brand._id)
        report.brands = report.brands.filter((el) => el.brand._id !== row.brand._id)
        // обновляем отчет
        await this.$axios.$put('/api/v1/report/summory/update/' + report._id, report)
        // обновляем отчет в таблице
        this.$emit('updateReport', {
          reportId: report._id
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    /**
     * Загрузть данные из excel
     */
    uploadFromExcel(e) {
      try {
        const files = e.target.files
        const file = files[0]

        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString

        reader.onload = (e) => {
          let data = e.target.result
          if (!rABS) data = new Uint8Array(data)
          const wb = XLSX.read(data, {type: rABS ? 'binary' : 'array'})

          let result = {}
          wb.SheetNames.forEach((sheetName) => {
            const roa = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 })
            if (roa.length) result = roa
          })
          result.shift() // удаляем первую строку
          this.excelList = result // устанавливаем получившийся результат
          this[this.excelListType]() // устанавливаем данные из ексельки
        }

        if (rABS) {
          reader.readAsBinaryString(file)
        } else {
          reader.readAsArrayBuffer(file)
        }
      } catch (e) {
        console.error(
          'Ошибка при попытке загрузки ексель, файла.',
          'Используемый метод', this.excelListType,
          'ошибка', e
        )
      }
    },
    /**
     * Установка данных из excel
     * Первый блок - открытые заявки
     */
    async excelSetOpenParams () {
      this.loading = true
      this.onlyRefresh = true // на всякий случай блокируем загрузку данных из ремонлайн
      for await (const item of this.tableData.brands) {
        const brandName = item.brand.name.toLowerCase().trim()

        let allOrders = 0
        let cameToService = 0
        let closeOrders = 0

        for await (const row of this.excelList) {
          // console.log('row', row)
          let brand = row[33].split(',')
          brand = brand[0].toLowerCase().trim()
          // все заказы
          if (brand === brandName) {
            allOrders++
            // кто пришли в СЦ
            if (row[4].trim() !== 'Не пришел') cameToService++
            // закрытые заказы
            if (row[4].trim() !== 'Закрыт') closeOrders++
          }
        }
        // все заявки бренда
        item.order.count = allOrders
        // кто пришли в СЦ
        item.came_to_sc.count = cameToService
        // закрытые заказы
        item.order_closed.count = closeOrders
      }
      this.excelList = []
      this.updateTable() // обновляем расчеты
    },
    /**
     * Установка данных из excel
     * Второй блок - закрытые заявки
     */
    async excelSetCloseParams () {
      this.loading = true
      this.onlyRefresh = true // на всякий случай блокируем загрузку данных из ремонлайн
      for await (const item of this.tableData.brands) {
        const brandName = item.brand.name.toLowerCase().trim()
        let revenue = 0 // выручка / сколько заплатили
        let expenses = 0 // расходы
        let orders = 0 // заказы

        for await (const row of this.excelList) {
          let brand = row[33].split(',')
          brand = brand[0].toLowerCase().trim()
          // все заказы
          if (brand === brandName) {
            orders++
            revenue += row[10]
            expenses += row[16]
          }
        }
        item.revenue = revenue
        item.expenses = expenses
        item.orders = orders
      }
      this.excelList = []
      this.updateTable() // обновляем расчеты
    }
  }
}
</script>

<style>
.updateTable {
  padding: 5px 8px;
}
.updateTable2 {
  padding: 7px 8px;
}
.saveTable {
  padding: 7px 8px;
}
.removeTable {
  padding: 7px 8px !important;
}
.input-transparent input {
  padding-right: 7px !important;
}
.el-input__inner{}
.el-table th>.cell{
  font-weight: 400;
  font-size: 13px;
  color: black;
}
.removeTableRow,
.updateTableRow{
  position: absolute;
  z-index: 9;
  bottom: 7px;
  left: 8px;
  padding: 3px;
}
.removeTableRow {
  padding: 4px !important;
  height: 20px;
  left: 32px;
}
</style>
