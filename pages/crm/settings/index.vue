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
          <app-type-device-panel />
        </el-tab-pane>
        <el-tab-pane label="Бренды" name="brands">
          <app-brands-panel />
        </el-tab-pane>
        <el-tab-pane label="Неисправности" name="malfunctions">
          <app-malfunctions-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppStatusPanel from '~/components/crm/status/Panel'
import AppStagePanel from '~/components/crm/stage/Panel'
import AppTypeRequestPanel from '~/components/crm/typeRequests/Panel'
import AppTypeDevicePanel from '~/components/crm/typeDevice/Panel'
import AppBrandsPanel from '~/components/settings/remonline/brand/Panel'
import AppMalfunctionsPanel from '~/components/crm/malfunctions/Panel'

export default {
  components: {
    AppStatusPanel,
    AppStagePanel,
    AppTypeRequestPanel,
    AppTypeDevicePanel,
    AppBrandsPanel,
    AppMalfunctionsPanel
  },
  async fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/crm/status',
        label: 'Настройки CRM'
      }
    ])
    if (store.state.report.brand.brands.length <= 0) {
      await store.dispatch('report/brand/fetchItems')
    }
  }
}
</script>
