<template>
  <div>
    <div v-if="pageData.brands">
      <div class="col-12">
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
          @click="runWorkerUpdateTable"
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
            v-if="
              $abilities('report-main_branch_panel_summorysheat_panel-remove')
            "
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
            @click="() => (excelListType = 'runWorkerOpenParams')"
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
            @click="() => (excelListType = 'runWorkerCloseParams')"
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
      <!-- {{ pageData.total }} -->
      <no-ssr>
        <div :class="['grid', loading ? 'disabled' : '']">
          <fancy-grid-vue
            :width="gridConfig.width"
            :height="gridConfig.height"
            :data="columnData"
            :resizable="true"
            :defaults="gridConfig.defaults"
            :sel-model="'rows'"
            :trackOver="true"
            :columns="gridConfig.columns"
            theme="gray"
          />
        </div>
        <!-- :row-headers="true" -->
      </no-ssr>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
/* eslint-disable prettier/prettier */
import Rem from '~/utils/remonline.js'
const rem = new Rem(process.env.REMONLINE_API_KEY, true)

export default {
  components: {
    // FancyGridVue
  },
  data() {
    return {
      loading: false,
      pinnedTopSource: [
        // { 'orders': '31231' }
      ],
      columnData: [
        {
          name: 'Ted',
          surname: 'Smith',
          position: 'Java Developer',
          email: 'ted.smith@gmail.com',
          company: 'Electrical Systems',
          age: 30,
          knownledge: 'Java, Ruby',
          elm: {
            param1: '555'
          }
        },
        {
          name: 'Ed',
          surname: 'Johnson',
          position: 'C/C++ Market Data Developer',
          email: 'ed.johnson@gmail.com',
          company: 'Energy and Oil',
          age: 35,
          knownledge: 'C++',
          elm: {
            param1: '555'
          }
        },
        {
          name: 'Sam',
          surname: 'Williams',
          position: 'Technical Analyst',
          email: 'sam.williams@gmail.com',
          company: 'Airbus',
          age: 38,
          knownledge: '',
          elm: {
            param1: '555'
          }
        },
        {
          name: 'Alexander',
          surname: 'Brown',
          position: 'Project Manager',
          email: 'alexander.brown@gmail.com',
          company: 'Renault',
          age: 24,
          knownledge: '',
          elm: {
            param1: '555'
          }
        },
        {
          name: 'Nicholas',
          surname: 'Miller',
          position: 'Senior Software Engineer',
          email: 'nicholas.miller@gmail.com',
          company: 'Adobe',
          age: 33,
          knownledge: 'Unix, C/C++',
          elm: {
            param1: '555'
          }
        },
        {
          name: 'Andrew',
          surname: 'Thompson',
          position: 'Agile Project Manager',
          email: 'andrew.thompson@gmail.com',
          company: 'Google',
          age: 28,
          knownledge: '',
          elm: {
            param1: '555'
          }
        },
        {
          name: 'Ryan',
          surname: 'Walker',
          position: 'Application Support Engineer',
          email: 'ryan.walker@gmail.com',
          company: 'Siemens',
          age: 39,
          knownledge: 'ActionScript',
          elm: {
            param1: '555'
          }
        },
        {
          name: 'John',
          surname: 'Scott',
          position: 'Flex Developer',
          email: 'john.scott@gmail.com',
          company: 'Cargo',
          age: 45,
          knownledge: 'Flex',
          elm: {
            param1: '555'
          }
        }
      ], // типы колонок таблицы
      gridConfig: {
        title: 'Vue with FancyGrid',
        theme: 'gray',
        width: 700,
        height: 400,
        resizable: true,
        defaults: {
          type: 'string',
          width: 100,
          sortable: true,
          // editable: true,
          resizable: true
        },
        selModel: 'rows',
        trackOver: true,
        columns: [
          {
            type: 'select'
          },
          {
            index: 'company',
            title: 'Company'
          },
          {
            index: 'name',
            title: 'Name'
          },
          {
            index: 'surname',
            title: 'Sur Name'
          },
          {
            index: 'age',
            title: 'Age',
            type: 'number',
            width: 80
          },
          {
            index: 'email',
            title: 'Email',
            width: 160
          },
          {
            index: 'elem',
            title: 'test param',
            width: 160,
            render: (el) => el.param1
          },
        ]
      },
      /**
       * тип загружаемого дакумента, для открытых или закрытых заказов
       * runWorkerOpenParams - открытые
       * runWorkerCloseParams - закрытые
       */
      pageData: [], // реальные данные
      excelListType: 'runWorkerOpenParams',
      excelList: [], // загружаемоя екселька
      onlyRefresh: true, // без получения новых данных из ремонлайн
      turnWorkers: [], // очередь выполнения воркеров
      windowWidth: 1000 // ширина окна
    }
  },
  computed: {
    tableData() {
      return this.$store.getters['report/summary/report']
    }
  },
  watch: {
    tableData(val) {
      this.pageData = val
      this.windowUpdate()
    }
  },
  mounted() {
    // считаем ширину таблицы
    window.addEventListener('resize', (e) => {
      this.windowUpdate()
    })
  },
  methods: {
    /**
     * Обновляем ширину окна
     */
    windowUpdate() {
      let time = 30
      const timeValue = setInterval((interval) => {
        const item = document.querySelector('#branchWidth')
        if (item && item.clientWidth) this.windowWidth = item.clientWidth - 50

        time -= 1
        if (time <= 0) {
          clearInterval(timeValue)
        }
      }, 2000)
    },

    // TODO перевести в фильтры
    priceMask(val) {
      return val ? `${val} ₽` : '-'
    },

    /**
     * Редактирование ячейки
     */
    onCellEdit(row) {
      // console.log('row', row.detail.rowIndex, row.detail.prop)
      // ужасно, но я не придумал как сделать красиво
      const idx = row.detail.rowIndex
      switch (row.detail.prop) {
        case 'requests.chanel.pk':
          this.pageData.brands[idx].requests.chanel.pk = row.detail.val
          break
        case 'requests.chanel.seo':
          this.pageData.brands[idx].requests.chanel.seo = row.detail.val
          break
        case 'order.count':
          this.pageData.brands[idx].order.count = row.detail.val
          break
        case 'order_closed.count':
          this.pageData.brands[idx].order_closed.count = row.detail.val
          break
        case 'came_to_sc.count':
          this.pageData.brands[idx].came_to_sc.count = row.detail.val
          break
        case 'common_expenses.balance':
          this.pageData.brands[idx].common_expenses.balance = row.detail.val
          break
        case 'common_expenses.pk':
          this.pageData.brands[idx].common_expenses.pk = row.detail.val
          break
        case 'common_expenses.seo':
          this.pageData.brands[idx].common_expenses.seo = row.detail.val
          break
        case 'common_expenses.common':
          this.pageData.brands[idx].common_expenses.common = row.detail.val
          break
      }
      // this.pageData.brands[row.detail.rowIndex].requests.chanel.pk = row.detail.val
      // this.pageData.brands[row.detail.rowIndex][row.detail.prop] = row.detail.val
    },

    /**
     * Удаление отчета
     */
    async removeTable() {
      this.loading = true
      try {
        await this.$axios.$delete(
          '/api/v1/report/summory/remove/' + this.pageData._id
        )
        this.$notify({
          message: 'Отчет успушно удален!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('report/summary/SET_REPORT', {})
        this.$store.dispatch('report/summary/fetchItems')
      } catch (e) {
        console.error('Не удалось удалить отчет', e)
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * Загрузка данных из ремонлайн - все записи
     */
    async getAllOrders(brandName) {
      this.loading = true
      try {
        // дата
        const created = this.pageData.period.split(' ')
        created[0] = new Date(created[0] + ' 00:00:00').getTime()
        created[1] = new Date(created[1] + ' 00:00:00').getTime()
        // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
        const filter = [
          `created_at[]=${created[0]}`,
          `created_at[]=${created[1]}`,
          `branches[]=${this.pageData.branch_id.branch_id}`,
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
          'statuses[]=192751' // Не пришел
        ]
        const orders = await rem.getOrders(`&${filter.join('&')}`)
        // console.log('tableData.period', this.pageData.period, brandName, '-', orders.count)
        return orders.count
      } catch (e) {
        this.$store.commit(
          'SET_ERROR',
          'Не удалось получить данные от remonline. Попробуйте по позже повторить данное действие.'
        )
      } finally {
        this.loading = false
      }
    },

    /**
     * Загрузка данных из ремонлайн - пришел в сц
     */
    async cameToService(brandName) {
      this.loading = true
      try {
        // дата
        const created = this.pageData.period.split(' ')
        created[0] = new Date(created[0] + ' 00:00:00').getTime()
        created[1] = new Date(created[1] + ' 00:00:00').getTime()
        // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
        const filter = [
          `created_at[]=${created[0]}`,
          `created_at[]=${created[1]}`,
          `branches[]=${this.pageData.branch_id.branch_id}`,
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
          'statuses[]=241717' // Для открытия
          // 'statuses[]=192751', // Не пришел
          // 'page=1',
        ]
        // 1598907600000, 1601499599999
        // 1598918400000, 1601424000000
        const orders = await rem.getOrders(`&${filter.join('&')}`)

        return orders.count
      } catch (e) {
        this.$store.commit(
          'SET_ERROR',
          'Не удалось получить данные от remonline. Попробуйте по позже повторить данное действие.'
        )
      } finally {
        this.loading = false
      }
    },

    /**
     * Загрузка данных из ремонлайн - клиент закрыт
     */
    async closeOrders(brandName) {
      this.loading = true
      try {
        // дата
        const created = this.pageData.period.split(' ')
        created[0] = new Date(created[0] + ' 00:00:00').getTime()
        created[1] = new Date(created[1] + ' 00:00:00').getTime()
        // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
        const filter = [
          `created_at[]=${created[0]}`,
          `created_at[]=${created[1]}`,
          `branches[]=${this.pageData.branch_id.branch_id}`,
          `brands[]=${brandName}`,
          'statuses[]=151384' // Закрыт
          // 'page=1',
        ]
        const orders = await rem.getOrders(`&${filter.join('&')}`)
        // for (const order of orders.data) {
        //   console.log('order brand', order.brand)
        // }
        // console.log('orders', orders)
        // console.log('tableData.period', this.pageData.period, brandName, '-', orders.count)
        return orders.count
      } catch (e) {
        this.$store.commit(
          'SET_ERROR',
          'Не удалось получить данные от remonline. Попробуйте по позже повторить данное действие.'
        )
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
          const created = this.pageData.period.split(' ')
          created[0] = new Date(created[0] + ' 00:00:00').getTime()
          created[1] = new Date(created[1] + ' 00:00:00').getTime()

          const filter = [
            `created_at[]=${created[0]}`,
            `created_at[]=${created[1]}`,
            `branches[]=${this.pageData.branch_id.branch_id}`,
            `brands[]=${brandName}`,
            'statuses[]=151384', // Закрыт
            'statuses[]=162791', // Выкупил СЦ
            'statuses[]=198277', // Закрыт (Отказ СХ)
            'statuses[]=198285', // Закрыт (Отказ Менеджер)
            'statuses[]=241717', // Для открытия
            `page=${i}`
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
        this.$store.commit(
          'SET_ERROR',
          'Не удалось получить данные от remonline, чтоб посчитать выручку расходы и заказы'
        )
      } finally {
        this.loading = false
      }
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
          '/api/v1/report/summory/update/' + this.pageData._id,
          this.pageData
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
        const report = JSON.parse(JSON.stringify(this.pageData))
        // удаляем бренд
        report.brands_id = report.brands_id.filter((el) => el !== row.brand._id)
        report.brands = report.brands.filter(
          (el) => el.brand._id !== row.brand._id
        )
        // обновляем отчет
        await this.$axios.$put(
          '/api/v1/report/summory/update/' + report._id,
          report
        )
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
        // this.excelList
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString

        reader.onload = (e) => {
          let data = e.target.result
          if (!rABS) data = new Uint8Array(data)
          const wb = XLSX.read(data, { type: rABS ? 'binary' : 'array' })

          let result = {}
          wb.SheetNames.forEach((sheetName) => {
            const roa = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
              header: 1
            })
            if (roa.length) result = roa
          })
          result.shift() // удаляем первую строку
          this.excelList = result // устанавливаем получившийся результат
          console.log('отправляем данные считаться на другой поток')
          this[this.excelListType]() // запускаем нужный метод
        }

        if (rABS) {
          reader.readAsBinaryString(file)
        } else {
          reader.readAsArrayBuffer(file)
        }
      } catch (e) {
        console.error(
          'Ошибка при попытке загрузки ексель, файла.',
          'Используемый метод',
          this.excelListType,
          'ошибка',
          e
        )
      } finally {
        e.path[0].value = '' // отчищаем input file для повторной загрузки файла
      }
    },

    /**
     * Запуск воркера для подсчета данных из excel
     * Первый блок - открытые заявки
     */
    runWorkerOpenParams() {
      this.loading = true
      this.onlyRefresh = true
      // если очередь не пуста, то тогда записываем ее в конец выполнения
      // this.turnWorkers = ['excelSetOpenParams']

      // запуск воркера
      const worker = new Worker(
        '/js/workers/report/summary/excelSetOpenParams.worker.js'
      )
      worker.postMessage({
        table: this.pageData.brands,
        arr: this.excelList
      })
      // запускаем его в очередь выполнения
      worker.onmessage = (event) => {
        this.setDataTableAndSave(event.data)
      }
    },

    /**
     * Запуск воркера для подсчета данных из excel
     * Второй блок - закрытые заявки
     */
    runWorkerCloseParams() {
      this.loading = true
      this.onlyRefresh = true // на всякий случай блокируем загрузку данных из ремонлайн
      const worker = new Worker(
        '/js/workers/report/summary/excelSetCloseParams.worker.js'
      )
      worker.postMessage({
        table: this.pageData.brands,
        arr: this.excelList
      })
      this.excelList = []

      worker.onmessage = (event) => {
        this.setDataTableAndSave(event.data)
      }
    },

    /**
     * Обновление отчета
     */
    runWorkerUpdateTable() {
      this.loading = true
      this.onlyRefresh = true
      // запуск воркера
      const worker = new Worker(
        '/js/workers/report/summary/updateTable.worker.js'
      )
      worker.postMessage({
        table: this.pageData.brands
      })
      this.excelList = []
      worker.onmessage = async (event) => {
        // сохраняем данные по брендам
        await this.setDataTableAndSave(event.data)
        await this.runWorkerCountingTheTotal()
      }
    },

    /**
     * Подсчет итогов
     */
    runWorkerCountingTheTotal() {
      this.loading = true
      this.onlyRefresh = true
      // запуск воркера
      const worker = new Worker(
        '/js/workers/report/summary/countingTheTotal.worker.js'
      )
      worker.postMessage({
        table: this.pageData
      })
      worker.onmessage = (event) => {
        this.setTotalDataTableAndSave(event.data)
        // worker.terminate() // убиваем
      }
    },

    /**
     * Установка данных, после пересета данных
     */
    setDataTable(data) {
      this.loading = false
      this.pageData.brands = []
      this.pageData.brands = data
    },

    /**
     * Установка данных, после пересета и сохранить
     */
    setDataTableAndSave(data) {
      this.loading = false
      this.pageData.brands = []
      this.pageData.brands = data
      this.saveTable()
    },

    /**
     * Сохраняем данные после итогового подсчета
     */
    setTotalDataTableAndSave(data) {
      this.pageData.total = data.total
      this.saveTable()
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
.el-input__inner {
}
.el-table th > .cell {
  font-weight: 400;
  font-size: 13px;
  color: black;
}
.removeTableRow,
.updateTableRow {
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
