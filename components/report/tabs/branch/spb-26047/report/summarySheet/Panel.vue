<template>
  <div class="row">
    <div class="col-md-10">
      <el-select
        v-if="$abilities('report-spb_26047_panel_summorysheat_panel-read')"
        v-model="report"
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
      <el-button
        v-if="$abilities('report-spb_26047_panel_summorysheat_panel-read')"
        @click="loadReport"
        size="mini"
        type="primary"
        icon="el-icon-position"
        title="Выбрать отчет"
      >
        Выбрать отчет
      </el-button>
    </div>
    <div class="mt-15" style="margin-bottom:-15px;">
      <!-- v-if="$abilities('report-spb_26047_panel_summorysheat_panel-read')" -->
      <app-list :page-data="pageData" @toogleMoreData="toogleMoreData" />
      <!-- @updateReport="loadReport" -->
    </div>
  </div>
</template>

<script>
import AppList from '~/components/report/tabs/branch/spb-26047/report/summarySheet/List'

export default {
  components: {
    AppList
  },
  data() {
    return {
      rem: '',
      report: '',
      tempBrands: {},
      branchId: '26047', // id филиала - из ремонлайн
      branchIdOnReport: '', // id из отчета
      pageData: {},
      originalData: {}, // оригинальные данные
      moreData: false // показать/скрыть лишние бренды
    }
  },
  computed: {
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

      // получаем id филиала по id из ремонлайна
      const branchId = this.$store.getters['report/branch/branches'].find(
        (el) => el.branch_id === this.branchId
      )

      try {
        const report = await this.$axios.$get(
          '/api/v1/report/summory/get/' + this.report
        )
        this.tempBrands = {}
        // eslint-disable-next-line
        this.tempBrands.brands = report.brands.filter((el) => el.branch._id === branchId._id)
        this.tempBrands.total = report.total

        // запуск воркера
        const worker = new Worker(
          '/js/workers/report/summary/countingTheTotal.worker.js'
        )
        worker.postMessage({
          table: this.tempBrands
        })
        worker.onmessage = (event) => {
          // сохраняем данные по итогам
          this.prioritySorting(event.data)
        }

        // запус воркера итоговой суммы для данного филиала
      } catch (e) {
        console.error('Не удалось загрузить данные таблицы', e)
        this.$store.commit('SET_ERROR', 'Не удалось загрузить данные таблицы')
      }
    },

    /**
     * Обрабатываем данные по приоритету
     */
    async prioritySorting(report) {
      // const report = JSON.parse(JSON.stringify(data))
      if (this.$store.state.domains.damains.length === 0) {
        await this.$store.dispatch('domains/fetchDomains')
      }
      const domains = this.$store.state.domains.damains
      const result = []

      for (const idx in report.brands) {
        const brand = report.brands[idx].brand.name.toLowerCase()
        let sortPriority = {
          priority: 150,
          priority2: 150,
          priority3: 150
        }

        // возвращаем найденные приоритеты
        for (const el of domains) {
          if (el.brand.toLowerCase() === brand) {
            sortPriority = el
            break
          }
        }

        // достаем параметры для сортировки
        const item = {
          ...report.brands[idx],
          priority: +sortPriority.priority || 150,
          priority2: +sortPriority.priority2 || 150,
          priority3: +sortPriority.priority3 || 150
        }
        result.push(item)
      }

      report.brands = [...result]
      this.setTotalDataTable(report)
    },

    /**
     * Сохраняем данные после итогового подсчета
     */
    setTotalDataTable(data) {
      this.pageData = JSON.parse(JSON.stringify(data))
      this.originalData = JSON.parse(JSON.stringify(data))
      this.tempBrands = {}
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
        // eslint-disable-next-line
        brands.brands = brands.brands.filter((el) => el.priority !== 150)
      } else {
        brands.brands = this.originalData.brands
      }
      this.pageData.brands = brands.brands
    }
  }
}
</script>
