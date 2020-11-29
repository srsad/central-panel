<template>
  <el-tabs type="border-card" value="summarysheet">
    <el-tab-pane label="Сводные листы" name="summarysheet">
      <app-summary-sheet-panel />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppSummarySheetPanel from '~/components/report/tabs/branch/spb-26047/report/summarySheet/Panel'

export default {
  components: {
    AppSummarySheetPanel
  }
}
</script>
