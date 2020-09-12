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
        <el-tab-pane label="Тип заказа" name="typeRequest">
          <app-type-request-panel />
        </el-tab-pane>
        <el-tab-pane label="Типы устроиств" name="typeDevice">
          <!-- <app-stage-panel /> -->
        </el-tab-pane>
        <!-- <el-tab-pane label="" name="stage">
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppStatusPanel from '~/components/crm/status/Panel'
import AppStagePanel from '~/components/crm/stage/Panel'
import AppTypeRequestPanel from '~/components/crm/typeRequests/Panel'

export default {
  components: {
    AppStatusPanel,
    AppStagePanel,
    AppTypeRequestPanel
  },
  fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/crm/status',
        label: 'Настройки CRM'
      }
    ])
  }
}
</script>
