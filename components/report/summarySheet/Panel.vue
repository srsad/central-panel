<template>
  <div class="row">
    <div class="col-12">
      <el-tabs type="border-card" value="statistiks">
        <el-tab-pane label="Статистика" name="statistiks">
          <app-statistiks-panel />
        </el-tab-pane>
        <el-tab-pane label="Бренды" name="brands">
          <app-brands-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppBrandsPanel from '~/components/report/summarySheet/tabs/brand/Panel'
import AppStatistiksPanel from '~/components/report/summarySheet/tabs/report/Panel'

export default {
  components: {
    AppBrandsPanel,
    AppStatistiksPanel
  },
  methods: {
    addNewBrand() {
      console.log('addNewBrand')
    }
    // tabClick(tab, event) {
    //   console.log('tabClick', tab.paneName)
    //   console.log('tabClick', {
    //     tab,
    //     event
    //   })
    // }
  }
}
</script>
