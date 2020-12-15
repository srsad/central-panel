<template>
  <el-tabs type="border-card" value="summarysheet">
    <el-tab-pane
      v-if="$abilities('report-spb_26047_panel_summorysheat_panel')"
      label="Сводные листы"
      name="summarysheet"
    >
      <app-summary-sheet-panel />
    </el-tab-pane>
    <el-tab-pane
      v-if="$abilities('report-spb_26047_panel_schedule_panel')"
      label="График работ"
      name="schedule"
    >
      <app-schedule-panel />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppSummarySheetPanel from '~/components/report/tabs/branch/spb-26047/report/summarySheet/Panel'
import AppSchedulePanel from '~/components/report/tabs/branch/spb-26047/report/schedule/Panel'

export default {
  components: {
    AppSummarySheetPanel,
    AppSchedulePanel
  }
}
</script>
