<template>
  <div class="row">
    <div class="col-12">
      <el-tabs type="border-card" value="branches">
        <el-tab-pane
          v-if="$abilities('settings-remonline_panel_branches')"
          label="Филиалы"
          name="branches"
        >
          <app-branches-panel />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('settings-remonline_panel_brands')"
          label="Бренды"
          name="brands"
        >
          <app-brands-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import AppBrandsPanel from '~/components/settings/remonline/brand/Panel'
import AppBranchesPanel from '~/components/settings/remonline/branches/Panel'

export default {
  components: {
    AppBrandsPanel,
    AppBranchesPanel
  }
}
</script>
