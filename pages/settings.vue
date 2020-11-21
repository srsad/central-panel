<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs :value="activeTab">
        <el-tab-pane
          v-if="$abilities('settings-options_panel')"
          label="Общие настройки"
          name="settings"
        >
          <app-other-settings />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('settings-api_key_panel-read')"
          label="API ключи"
          name="apikey"
        >
          <app-api-key />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('settings-city_panel-read')"
          label="Список городов"
          name="city"
        >
          <app-cityes />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('settings-yandex_profiles_panel-read')"
          label="Яндекс аккаунты"
          name="yandex"
        >
          <app-yandex-profiles />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppApiKey from '~/components/settings/ApiKeys'
import AppCityes from '~/components/settings/Cityes'
import AppYandexProfiles from '~/components/settings/YandexProfiles'
import AppOtherSettings from '~/components/settings/OtherSettings'

export default {
  components: {
    AppApiKey,
    AppCityes,
    AppYandexProfiles,
    AppOtherSettings
  },
  data() {
    return {
      activeTab: 'settings'
    }
  },
  fetch({ store }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/settings',
        label: 'Настройки'
      }
    ])
  },
  mounted() {
    if (window.location.hash === '#yandex') this.activeTab = 'yandex'
  }
}
</script>
