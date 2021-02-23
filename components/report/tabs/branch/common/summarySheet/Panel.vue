<template>
  <div class="row">
    <div class="col-md-10">
      <!-- v-if="$abilities(`report-msk_${branchId}_panel_summorysheat_panel-read`)" -->
      <el-select
        v-model="report"
        :disabled="loading"
        size="mini"
        placeholder="Выберите период"
      >
        <el-option
          v-for="item in reports"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        />
      </el-select>
      <!-- v-if="$abilities(`report-msk_${branchId}_panel_summorysheat_panel-read`)" -->
      <el-button
        @click="loadReport"
        :loading="loading"
        size="mini"
        type="primary"
        icon="el-icon-position"
        title="Выбрать отчет"
      >
        Выбрать отчет
      </el-button>
    </div>
    <div class="mt-15" style="margin-bottom:-15px;">
      <app-list
        :page-data="pageData"
        :loading="loading"
        @toogleMoreData="toogleMoreData"
        @saveTable="runWorkerCountingFullTheTotal"
        @updateTable="updateTable"
      />
      <!-- созраняю через переподсчет всей таблицы -->
    </div>
  </div>
</template>

<script>
import AppList from '~/components/report/tabs/branch/common/summarySheet/List'

export default {
  components: {
    AppList
  },
  props: {
    // id филиала - из ремонлайн
    branchId: {
      type: String,
      default: '72021'
    }
  },
  data() {
    return {
      loading: false,
      rem: '',
      report: '',
      tempBrands: {},
      branchIdOnReport: '', // id из отчета
      pageData: {},
      originalData: {}, // оригинальные данные
      fullData: {}, // полные, начальные данные которые включают все филиалы
      moreData: false // показать/скрыть лишние бренды
    }
  },
  computed: {
    /**
     * Список отчетов для текущего филиала
     */
    reports() {
      // получаем id филиала по id из ремонлайна
      const branchId = this.$store.getters['report/branch/branches'].find(
        (el) => el.branch_id === this.branchId
      )
      // eslint-disable-next-line
      return this.$store.getters['report/summary/reports'].filter((el) => el.branch_id.includes(branchId._id))
    }
  },
  methods: {
    /**
     * Загрузить отчет
     */
    async loadReport() {
      if (!this.report) {
        this.$notify({
          message: 'Выберите отчет!',
          customClass: 'error-notyfy'
        })
        return false
      }

      this.loading = true

      // получаем id филиала по id из ремонлайна
      const branchId = this.$store.getters['report/branch/branches'].find(
        (el) => el.branch_id === this.branchId
      )

      try {
        const report = await this.$axios.$get(
          '/api/v1/report/summory/get/' + this.report
        )
        this.tempBrands = {}
        this.fullData = JSON.parse(JSON.stringify(report))
        // eslint-disable-next-line
        this.tempBrands.brands = report.brands.filter((el) => el.branch._id === branchId._id)
        this.tempBrands.total = report.total

        // сортировка
        await this.prioritySorting(this.tempBrands)
        // запуск воркера для подсчета итогов только этого филиала
        await this.runWorkerCountingTheTotal()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * Обрабатываем данные по приоритету
     */
    async prioritySorting(report) {
      this.loading = true
      try {
        if (this.$store.state.domains.damains.length === 0) {
          await this.$store.dispatch('domains/fetchDomains')
        }
        const domains = this.$store.state.domains.damains
        const res = []

        // TODO костыль для сопоставляния филиала+адреса с компанией
        const branches = new Map([
          ['СПБ 2-я Красноармейская', 'R-service СПб'],
          ['СПБ Дмитровский', 'Impuls СПб'],
          ['МСК Новослободская', 'R-service МСК'],
          ['МСК Армянский', 'Impuls МСК'],
          ['МСК Сеславинская', 'Impuls МСК']
        ])

        for (const idx in report.brands) {
          const branch = branches.get(report.brands[idx].branch.name) // текущий филлиал
          const brand = report.brands[idx].brand.name.toLowerCase()

          let dcod = '99.00.00.00.00.00.00.00' // код по умолчанию

          // возвращаем найденный dcod
          for (const el of domains) {
            if (el.brand.toLowerCase() === brand && el.company === branch) {
              let _dcod = el.dcod.split('.')
              _dcod = +_dcod[0]
              if (_dcod < 90) {
                dcod = el.dcod
                break
              }
            }
          }
          // достаем параметры для сортировки
          res.push({ ...report.brands[idx], dcod })
        }

        // сортируем по доменному коду
        res.sort(function(a, b) {
          const aCode = a.dcod.replace(/\./g, '')
          const bCode = b.dcod.replace(/\./g, '')
          if (+aCode > +bCode) return 1
          if (+aCode < +bCode) return -1
          return 0
        })

        report.brands = [...res]
        this.setTotalDataTable(report)
      } catch (e) {
        this.$store.commit(
          'SET_ERROR',
          'Не удалось обрабать данные по приоритету'
        )
      } finally {
        this.loading = false
      }
    },

    /**
     * Сохраняем данные после итогового подсчета
     */
    setTotalDataTable(data) {
      this.pageData = JSON.parse(JSON.stringify(data))
      this.originalData = JSON.parse(JSON.stringify(data))
      this.tempBrands = {}
      this.toogleMoreData(true)
    },

    /**
     * Показать скрыть дополнительные бренды
     */
    toogleMoreData(status) {
      this.moreData = status
      // если оригинальные данные еще не заполненны
      const brands = JSON.parse(JSON.stringify(this.pageData))
      // если надо скрыть
      if (this.moreData) {
        brands.brands = brands.brands.filter((el) => {
          const dcod = el.dcod.split('.') // '99.00.00.00.00.00.00.00'
          return +dcod[0] < 90
        })
      } else {
        brands.brands = this.originalData.brands
      }
      this.pageData.brands = brands.brands
    },

    /**
     * Пересчет таблицы
     */
    updateTable() {
      this.compareTable()
      this.loading = true
      // запуск воркера
      const worker = new Worker(
        '/js/workers/report/summary/updateTable.worker.js'
      )
      worker.postMessage({
        table: this.fullData.brands
      })
      this.excelList = []
      worker.onmessage = async (event) => {
        // сохраняем данные по брендам
        await this.setDataTable(event.data)
        await this.runWorkerCountingFullTheTotal()
        await this.runWorkerCountingTheTotal()
        this.saveTable()
      }
    },

    /**
     * Подсчет общих итогово всей таблицы (все филиалы)
     */
    runWorkerCountingFullTheTotal() {
      this.loading = true
      // запуск воркера
      const worker = new Worker(
        '/js/workers/report/summary/countingTheTotal.worker.js'
      )
      worker.postMessage({
        table: this.fullData
      })
      worker.onmessage = (event) => {
        this.fullData.total = event.data.total
        this.saveTable()
      }
    },

    /**
     * Подсчет итогов только для данного филлиала
     */
    runWorkerCountingTheTotal() {
      this.loading = true
      // запуск воркера
      const worker = new Worker(
        '/js/workers/report/summary/countingTheTotal.worker.js'
      )
      worker.postMessage({
        table: this.pageData
      })
      worker.onmessage = (event) => {
        this.pageData.total = event.data.total
      }
    },

    /**
     * Установка данных, после пересета и сохранить
     */
    setDataTable(data) {
      this.loading = false
      this.fullData.brands = []
      this.fullData.brands = JSON.parse(JSON.stringify(data))

      // данные конкретного филиала
      // получаем id филиала по id из ремонлайна
      const branchId = this.$store.getters['report/branch/branches'].find(
        (el) => el.branch_id === this.branchId
      )
      // eslint-disable-next-line
      this.tempBrands.brands = data.filter((el) => el.branch._id === branchId._id)
    },

    /**
     * Сохраняем таблицу
     */
    async saveTable() {
      this.loading = true
      try {
        this.compareTable()
        await this.$axios.$put(
          '/api/v1/report/summory/update/' + this.fullData._id,
          this.fullData
        )
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * Обеденение основной таблицы с данными филиала
     */
    compareTable() {
      this.fullData.brands = this.fullData.brands.map((el) => {
        const item = this.pageData.brands.find((elem) => elem._id === el._id)
        if (item) el = item
        return el
      })
    }
  }
}
</script>
