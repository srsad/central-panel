<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs :value="activeTab">
        <el-tab-pane
          v-if="$abilities('malf-rservice_panel')"
          label="Неисправности"
          name="rservice_panel"
        >
          <app-rserice-panel />
        </el-tab-pane>
        <!-- <el-tab-pane
          v-if="$abilities('malf-impuls_panel')"
          label="Неисправности Impuls"
          name="impuls_panel"
        >
          <app-impuls-panel />
        </el-tab-pane> -->
        <el-tab-pane
          v-if="$abilities('malf-apple_panel')"
          label="Неисправности Apple"
          name="apple_panel"
        >
          <app-apple-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppRsericePanel from '~/components/malfunctions/rservice/Panel'
// import AppImpulsPanel from '~/components/malfunctions/impuls/Panel'
import AppApplePanel from '~/components/malfunctions/apple/Panel'

export default {
  components: {
    AppRsericePanel,
    // AppImpulsPanel,
    AppApplePanel
  },
  computed: {
    activeTab() {
      if (this.$abilities('malf-rservice_panel')) return 'rservice_panel'
      // if (this.$abilities('malf-impuls_panel')) return 'impuls_panel'
      if (this.$abilities('malf-apple_panel')) return 'apple_panel'
      return 'rservice_panel'
    }
  }
}
</script>
