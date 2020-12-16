<template>
  <el-tabs type="border-card" value="summarysheet">
    <el-tab-pane
      v-if="$abilities('report-spb_26047_panel_summorysheat_panel-read')"
      :lazy="true"
      label="Сводные листы"
      name="summarysheet"
    >
      <app-summary-sheet-panel />
    </el-tab-pane>
    <el-tab-pane
      v-if="$abilities('report-spb_26047_panel_schedule_panel-read')"
      :lazy="true"
      label="График работ"
      name="schedule"
    >
      <app-schedule-panel />
    </el-tab-pane>
    <el-tab-pane
      v-if="$abilities('report-spb_26047_panel_plan_panel-read')"
      :lazy="true"
      label="План"
      name="plan"
    >
      <app-plan-panel />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppSummarySheetPanel from '~/components/report/tabs/branch/spb-26047/report/summarySheet/Panel'
import AppSchedulePanel from '~/components/report/tabs/branch/spb-26047/report/schedule/Panel'
import AppPlanPanel from '~/components/report/tabs/branch/spb-26047/report/plan/Panel'

export default {
  components: {
    AppSummarySheetPanel,
    AppSchedulePanel,
    AppPlanPanel
  }
}
</script>
