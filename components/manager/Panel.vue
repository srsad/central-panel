<template>
  <div>
    <el-tabs value="plan" type="border-card">
      <el-tab-pane label="План" :lazy="true" name="plan">
        <app-plan :branch="branch" />
      </el-tab-pane>
      <el-tab-pane label="Расписание" :lazy="true" name="schedule">
        <app-schedule :branch="branch" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AppSchedule from '~/components/manager/schedule/Panel'
import AppPlan from '~/components/manager/plan/Panel'

export default {
  props: {
    branch: {
      type: String,
      default: '33038'
    }
  },
  components: {
    AppSchedule,
    AppPlan
  }
}
</script>
