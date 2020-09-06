<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs value="status">
        <el-tab-pane label="Этапы сделки" name="status">
          <app-status-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppStatusPanel from '~/components/crm/settings/status/Panel'
export default {
  components: {
    AppStatusPanel
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
