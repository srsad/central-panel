<template>
  <el-tabs type="border-card" value="summarysheet">
    <el-tab-pane
      v-if="$abilities('report-spb_33038_panel_summorysheat_panel')"
      label="Сводные листы"
      name="summarysheet"
    >
      <app-summary-sheet-panel />
    </el-tab-pane>
    <el-tab-pane
      v-if="$abilities('report-spb_33038_panel_schedule_panel')"
      label="График работ"
      name="schedule"
    >
      <app-schedule-panel />
    </el-tab-pane>
    <el-tab-pane
      v-if="$abilities('report-spb_33038_panel_plan_panel')"
      label="План"
      name="plan"
    >
      <app-plan-panel />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppSummarySheetPanel from '~/components/report/tabs/branch/spb-33038/report/summarySheet/Panel'
import AppSchedulePanel from '~/components/report/tabs/branch/spb-33038/report/schedule/Panel'
import AppPlanPanel from '~/components/report/tabs/branch/spb-33038/report/plan/Panel'

export default {
  components: {
    AppSummarySheetPanel,
    AppSchedulePanel,
    AppPlanPanel
  }
}
</script>
