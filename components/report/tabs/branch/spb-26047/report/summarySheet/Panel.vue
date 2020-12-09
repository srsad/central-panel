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
      <app-list :page-data="pageData" />
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
      pageData: {}
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
          this.setTotalDataTable(event.data)
        }

        // запус воркера итоговой суммы для данного филиала
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },

    /**
     * Сохраняем данные после итогового подсчета
     */
    setTotalDataTable(data) {
      this.pageData = data
      this.tempBrands = {}
    }
  }
}
</script>
