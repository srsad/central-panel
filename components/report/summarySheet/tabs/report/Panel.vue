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
      <el-button @click="loadRemOnline">
        test
      </el-button>
    </div>
    <div class="mt-15" style="margin-bottom:-15px;">
      <app-list @updateReport="loadReport" />
    </div>
    <app-report-window-create />
  </div>
</template>

<script>
import Rem from '~/utils/remonline.js'

import AppReportWindowCreate from '~/components/report/summarySheet/tabs/report/window/Create'
import AppList from '~/components/report/summarySheet/tabs/report/List'

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
      // &created_at=[1596834000000,1596920399999]&statuses=[151384,162791,198277,198285,241717]'
      // console.log('REMONLINE_API_KEY', process.env.REMONLINE_API_KEY)
      // const rem = new Rem('a2cda58eecae417d8a67cbb35bb68e7f', true)
      const rem = new Rem(process.env.REMONLINE_API_KEY, true)
      // const token = await rem.setToken()
      // const token = await rem.getBranches()
      // const token = await rem.getStatuses()
      // const token = await rem.getTypes()
      // const filter = ''
      // const token = await rem.getOrders(filter)
      // console.log('token - ', token)
      // дата
      // const created = this.tableData.period.split(' ')
      // created[0] = new Date(created[0]).getTime()
      // created[1] = new Date(created[1]).getTime()
      // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
      const items = []
      for (let i = 1; i <= 6; i++) {
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
        // item.order_closed.count = orders.count
        // console.log(i, `2020, 8, ${i} -`, orders.count, filter.join('&'))
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
        console.log('reportId', reportId)
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
