<template>
  <div class="row">
    <div class="col-md-10">
      <!-- <el-button
        @click="addNewReportFromExcel"
        size="mini"
        type="success"
        icon="fa fa-file-excel-o"
        title="Создать отчет"
      >
        Создать отчет из excel
      </el-button> -->
      <el-button
        v-if="$abilities('report-main_branch_panel-create')"
        @click="addNewReport"
        size="mini"
        type="success"
        icon="el-icon-plus"
        title="Создать отчет"
      >
        Создать отчет
      </el-button>
      <el-select
        v-if="$abilities('report-main_branch_panel-read')"
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
        v-if="$abilities('report-main_branch_panel-read')"
        @click="loadReport"
        size="mini"
        type="primary"
        icon="el-icon-position"
        title="Выбрать отчет"
      >
        Выбрать отчет
      </el-button>
      <!-- <el-button @click="loadRemOnline">
        test
      </el-button> -->
    </div>
    <div class="mt-15" style="margin-bottom:-15px;">
      <app-list
        v-if="$abilities('report-main_branch_panel-update')"
        @updateReport="loadReport"
      />
    </div>
    <!-- для создания отчета -->
    <app-report-window-create />
  </div>
</template>

<script>
import Rem from '~/utils/remonline.js'

import AppReportWindowCreate from '~/components/report/tabs/branch/main-branch/report/summarySheet/window/Create'
import AppList from '~/components/report/tabs/branch/main-branch/report/summarySheet/List'

export default {
  components: {
    AppReportWindowCreate,
    AppList
  },
  data() {
    return {
      rem: '',
      report: '',
      remlen: 0
    }
  },
  computed: {
    reports() {
      return this.$store.getters['report/summary/reports']
    }
  },
  methods: {
    /**
     * Создать отчет классическим способом
     */
    addNewReport() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportSummarySheetCreate',
        status: true
      })
    },
    async loadRemOnline() {
      const rem = new Rem(process.env.REMONLINE_API_KEY, true)
      // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
      const items = []
      for (let i = 14; i <= 21; i++) {
        // new Date('2020,7,1,00:01:01').getTime()
        const created1 = new Date(`2020,11,${i},00:01:01`).getTime()
        const created2 = new Date(`2020,11,${i},23:59:50`).getTime()
        // бренды - клиент закрыт
        const filter = [
          `created_at[]=${created1}`,
          `created_at[]=${created2}`,
          // `branches[]=26047` // rservice
          // `branches[]=33038` // impuls
          // `branches[]=63323` // msk
          `branches[]=72021` // msk арм
        ]
        const orders = await rem.getOrders(`${filter.join('&')}`)
        items.push(orders.count)
        // бренды - клиент закрыт
      }
      console.log('items', items)
    },
    async loadReport(reportId) {
      if (!this.report) {
        this.$notify({
          message: 'Выберите отчет!',
          customClass: 'error-notyfy'
        })
        return false
      }

      try {
        reportId = !reportId || this.report
        const report = await this.$axios.$get(
          '/api/v1/report/summory/get/' + this.report
        )
        this.$store.commit('report/summary/SET_REPORT', report)
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    }
  }
}
</script>
