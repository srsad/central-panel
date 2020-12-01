<template>
  <el-tabs type="border-card" value="summarysheet">
    <el-tab-pane label="Сводные листы" name="summarysheet">
      <app-summary-sheet-panel />
    </el-tab-pane>
    <el-tab-pane label="График работ" name="schedule">
      <app-schedule-panel />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppSummarySheetPanel from '~/components/report/tabs/branch/msk-63323/report/summarySheet/Panel'
import AppSchedulePanel from '~/components/report/tabs/branch/msk-63323/report/schedule/Panel'

export default {
  components: {
    AppSummarySheetPanel,
    AppSchedulePanel
  }
}
</script>
