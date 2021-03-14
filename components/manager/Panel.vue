<template>
  <div>
    <el-tabs value="plan" type="border-card">
      <el-tab-pane :lazy="true" label="План" name="plan">
        <app-plan :branch="branch" />
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="Расписание" name="schedule">
        <app-schedule :branch="branch" />
      </el-tab-pane>
      <el-tab-pane :lazy="true" label="Менеджмент" name="managment">
        <app-manager :branch="branch" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AppSchedule from '~/components/manager/schedule/Panel'
import AppPlan from '~/components/manager/plan/Panel'
import AppManager from '~/components/manager/manager/Panel'

export default {
  components: {
    AppSchedule,
    AppPlan,
    AppManager
  },
  props: {
    branch: {
      type: String,
      default: '33038'
    }
  }
}
</script>
