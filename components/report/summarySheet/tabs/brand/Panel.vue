<template>
  <div>
    <el-button
      @click="addNewBrand"
      size="mini"
      type="success"
      icon="el-icon-plus"
      title="Добавить бренд"
    >
      Добавить бренд
    </el-button>
    <div class="mt-15">
      <app-list />
    </div>
    <app-drawer-create-brand />
    <app-drawer-update-brand />
  </div>
</template>

<script>
import AppDrawerCreateBrand from '~/components/report/summarySheet/tabs/brand/DrawerCreate'
import AppDrawerUpdateBrand from '~/components/report/summarySheet/tabs/brand/DrawerUpdate'
import AppList from '~/components/report/summarySheet/tabs/brand/List'

export default {
  components: {
    AppDrawerCreateBrand,
    AppDrawerUpdateBrand,
    AppList
  },
  methods: {
    addNewBrand() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportSummarySheetCreateBrand',
        status: true
      })
    }
  }
}
</script>
