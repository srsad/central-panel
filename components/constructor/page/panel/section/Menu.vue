<template>
  <el-drawer
    :visible.sync="$store.state.siteConstructor.page.options.drawerSectionMenu"
    :with-header="false"
    :before-close="onClose"
    direction="ltr"
    title="Список блоков - Меню"
    custom-class="drawer"
  >
    Список блоков - Меню
  </el-drawer>
</template>

<script>
/**
 * Список блоков - Меню
 */
export default {
  methods: {
    onClose() {
      this.$store.commit('siteConstructor/page/options/SWITCH_DRAWNER', {
        dranwer: 'drawerSectionMenu',
        status: false
      })
    }
  }
}
</script>
