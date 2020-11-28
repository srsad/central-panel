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
import AppDrawerCreateBrand from '~/components/settings/remonline/brand/DrawerCreate'
import AppDrawerUpdateBrand from '~/components/settings/remonline/brand/DrawerUpdate'
import AppList from '~/components/settings/remonline/brand/List'

export default {
  components: {
    AppDrawerCreateBrand,
    AppDrawerUpdateBrand,
    AppList
  },
  mounted() {
    if (this.$store.getters['report/brand/brands'].length === 0) {
      this.$store.dispatch('report/brand/fetchItems')
    }
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
