<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs value="serrings">
        <el-tab-pane label="Общие настройки" name="serrings">
          <app-other-settings />
        </el-tab-pane>
        <el-tab-pane label="API ключи" name="apikey">
          <app-api-key />
        </el-tab-pane>
        <el-tab-pane label="Список городов" name="second">
          <app-cityes />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppApiKey from '~/components/settings/ApiKeys'
import AppCityes from '~/components/settings/Cityes'
import AppOtherSettings from '~/components/settings/OtherSettings'

export default {
  components: {
    AppApiKey,
    AppCityes,
    AppOtherSettings
  },
  fetch({ store }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/settings',
        label: 'Настройки'
      }
    ])
  }
}
</script>
