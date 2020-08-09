<template>
  <div class="row">
    <div class="col-md-2">
      <el-button
        @click="addNewReport"
        size="mini"
        type="success"
        icon="el-icon-plus"
        title="Добавить бренд"
      >
        Создать отчет
      </el-button>
    </div>
    <div class="col-md-10">
      <el-select v-model="report" size="mini" placeholder="Выберите период">
        <el-option
          v-for="item in options"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        >
        </el-option>
      </el-select>
      <el-button
        @click="loadReport"
        size="mini"
        type="primary"
        icon="el-icon-download"
        title="Загрузить отчет"
      >
        Загрузить отчет
      </el-button>

      <!-- <el-button @click="loadRemOnline">
        test
      </el-button> -->
    </div>
    <div class="mt-15" style="margin-bottom:-15px;">
      <app-list />
    </div>
    <app-report-window-create />
  </div>
</template>

<script>
import AppReportWindowCreate from '~/components/report/summarySheet/tabs/report/window/Create'
import AppList from '~/components/report/summarySheet/tabs/report/List'

export default {
  components: {
    AppReportWindowCreate,
    AppList
  },
  data() {
    return {
      report: '',
      rem: '',
      remlen: 0
    }
  },
  computed: {
    options() {
      return this.$store.getters['report/summary/reports']
    }
  },
  methods: {
    addNewReport() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportSummarySheetCreate',
        status: true
      })
    },
    async loadRemOnline() {
      const res = await this.$axios.$get(
        'https://cors-anywhere.herokuapp.com/https://api.remonline.ru/order/?token=ec362e14d7a1bafab16acef54d85cbd2c2d571fc&created_at=[1596834000000,1596920399999]&statuses=[151384,162791,198277,198285,241717]'
      )
      // console.log('res', res)
      this.rem = res
      this.remlen = res.data.length
    },
    async loadReport() {
      if (!this.report) {
        this.$notify({
          message: 'Выберите отчет!',
          customClass: 'error-notyfy'
        })
        return false
      }

      try {
        const report = await this.$axios.$get(
          '/api/v1/report/summory/get/' + this.report
        )
        this.$store.commit('report/summary/SET_REPORT', report)
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message, { root: true })
      }
    }
  }
}
</script>
