<template>
  <div class="row w100 mt-12">
    <div class="col-12">
      <el-tabs value="summary_sheet">
        <el-tab-pane label="Сводные листы" name="summary_sheet">
          <app-summary-sheet-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppSummarySheetPanel from '~/components/report/summarySheet/Panel'

export default {
  components: {
    AppSummarySheetPanel
  },
  async fetch({ store }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/report',
        label: 'Отчеты'
      }
    ])

    await store.dispatch('report/brand/fetchItems')
    await store.dispatch('report/summary/fetchItems')
  }
}
</script>
