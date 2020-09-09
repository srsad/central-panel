<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs value="status">
        <el-tab-pane label="Статусы" name="status">
          <app-status-panel />
        </el-tab-pane>
        <el-tab-pane label="Этапы" name="stage">
          <app-stage-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppStatusPanel from '~/components/crm/settings/status/Panel'
import AppStagePanel from '~/components/crm/stage/Panel'
export default {
  components: {
    AppStatusPanel,
    AppStagePanel
  },
  fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/crm/settings',
        label: 'Настройки CRM'
      }
    ])
  }
}
</script>
