<template>
  <div>
    <div v-if="tableData" style="display: inline-grid;">
      <el-button
        @click="updateTable"
        :loading="loading"
        class="updateTable"
        type="primary"
        size="mini"
        icon="el-icon-refresh"
        title="Обновить данные"
      />
      <!--  -->
      <el-popconfirm
        @onConfirm="removeTable"
        title="Удалить исключение?"
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
          title="Обновить данные"
        />
      </el-popconfirm>
      <!--  -->
      <el-table :data="tableData.brands">
        <el-table-column
          prop="brand.name"
          label="Сайт"
          width="150"
          fixed="left"
        />
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
          <el-table-column label="конверсия %">
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
          <el-table-column label="конверсия %">
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
          <el-table-column label="конверсия %">
            <template slot-scope="scope">
              {{ scope.row.order_closed.conversion }} %
            </template>
          </el-table-column>
        </el-table-column>
        <!--  -->
        <el-table-column label="Расходы">
          <el-table-column label="Баланс">
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
        <el-table-column prop="wed_check" label="Ср. чек" />
        <el-table-column prop="delta" label="Дельта" />
        <el-table-column prop="profit" label="Прибыль" />
        <el-table-column prop="spz" label="СПЗ" />
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
/* eslint-disable prettier/prettier */
import Rem from '~/utils/remonline.js'
const rem = new Rem(process.env.REMONLINE_API_KEY, true)

export default {
  data() {
    return {
      loading: false
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
     * Загрузка двнных из ремонлайн
     */
    async updataRemData() {
      this.loading = true
      try {
        // дата
        const created = this.tableData.period.split(' ')
        created[0] = new Date(created[0]).getTime()
        created[1] = new Date(created[1]).getTime()
        // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047

        for await (const item of this.tableData.brands) {
          // бренды - клиент закрыт
          const filter = [
            `created_at[]=${created[0]}`,
            `created_at[]=${created[1]}`,
            `branches[]=26047`,
            `brands[]=${item.brand.name}`,
            'statuses[]=151384',
            'statuses[]=162791',
            'statuses[]=198277',
            'statuses[]=198285',
            'statuses[]=241717',
          ]
          const orders = await rem.getOrders(`&${filter.join('&')}`)
          item.order_closed.count = orders.count
          // бренды - клиент закрыт
        }
        // console.log('tableData 1', brands)
        // await console.log('tableData', this.tableData)
      } catch (e) {
        this.$store.commit('SET_ERROR', 'Не удалось получить данные от remonline. Попробуйте по позже повторить данное действие.')
      } finally {
        this.loading = false
      }
      // 1596240000000, 1598832000000
      // 1593550800000, 1596229199999
    },
    /**
     * Обновление отчета
     */
    async updateTable() {
      this.loading = true

      // TODO проверять дату и время
      await this.updataRemData()

      for await (const item of this.tableData.brands) {
        // (c4+c5) | requests.chanel.pk+requests.chanel.seo
        const orderRang = +item.requests.chanel.pk + item.requests.chanel.seo
        // (R4+S4+T4+U4) | common_expenses.balance+common_expenses.pk+common_expenses.seo+common_expenses.common
        const commonExpenses =
          +item.common_expenses.balance +
          item.common_expenses.pk +
          item.common_expenses.seo +
          item.common_expenses.common
        // заявки
        item.requests.traffik_price = Math.round((+item.common_expenses.balance + item.common_expenses.seo) / orderRang) || 0
        item.requests.common_price = Math.round(commonExpenses / orderRang) || 0
        // запись
        item.order.traffik_price = Math.round(+item.common_expenses.balance / item.order.count) || 0
        item.order.common_price = Math.round(commonExpenses / item.order.count) || 0
        item.order.conversion = Math.round((+item.order.count / orderRang) * 100) || 0
        // Пришёл в СЦ
        item.came_to_sc.traffik_price = Math.round(+item.common_expenses.balance / item.came_to_sc.count) || 0
        item.came_to_sc.common_price = Math.round(commonExpenses / item.came_to_sc.count) || 0
        item.came_to_sc.conversion = Math.round((+item.came_to_sc.count / orderRang) * 100) || 0
        // Клиент закрыт
        item.order_closed.traffik_price = Math.round(+item.common_expenses.balance / item.order_closed.count) || 0
        item.order_closed.common_price = Math.round(commonExpenses / item.order_closed.count) || 0
        item.order_closed.conversion = Math.round((+item.order_closed.count / orderRang) * 100) || 0
        // вал
        item.val = Math.round(+item.revenue - item.expenses) || 0
        // средний чек
        item.wed_check = Math.round(+item.val / item.orders) || 0
        // дельта
        item.delta = Math.round(+item.wed_check - item.came_to_sc.common_price) || 0
        // прибыль
        item.profit = Math.round(+item.val * 0.65 - +item.came_to_sc.count * 70 - commonExpenses) || 0
        item.spz = Math.round(+item.profit / item.orders) || 0
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
    }
  }
}
</script>

<style scoped>
.updateTable,
.removeTable {
  position: absolute;
  z-index: 9;
  top: 90px;
  left: 100px;
}
.removeTable {
  left: 50px;
  padding: 4px 15px;
}
.input-transparent input {
  padding-right: 7px !important;
}
.el-input__inner{}
</style>
