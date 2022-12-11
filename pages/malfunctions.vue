<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs :value="activeTab">
        <el-tab-pane
          v-if="$abilities('malf-rservice_panel-read')"
          label="Неисправности"
          name="rservice_panel"
        >
          <app-rserice-panel />
        </el-tab-pane>
      </el-tabs>
    </div>

    <app-create-malfunction-window />
    <app-update-malfunction-window />
  </div>
</template>

<script>
import AppRsericePanel from '~/components/malfunctions/rservice/Panel'
import AppCreateMalfunctionWindow from '~/components/malfunctions/window/Create'
import AppUpdateMalfunctionWindow from '~/components/malfunctions/window/Update'

export default {
  components: {
    AppRsericePanel,
    AppCreateMalfunctionWindow,
    AppUpdateMalfunctionWindow
  },

  computed: {
    activeTab() {
      if (this.$abilities('malf-rservice_panel')) return 'rservice_panel'
      if (this.$abilities('malf-apple_panel')) return 'apple_panel'
      return 'rservice_panel'
    }
  },

  mounted() {
    if (!this.$store.state.repair.malfunction.malfunctions.length) {
      this.$store.dispatch('repair/malfunction/fetchItems')
    }

    this.$store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/malfunctions',
        label: 'Несиправности'
      }
    ])
  }
}
</script>
