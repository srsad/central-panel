<template>
  <el-drawer
    :visible.sync="$store.state.siteConstructor.page.options.drawerSectionTop"
    :with-header="false"
    :before-close="onClose"
    direction="ltr"
    title="Список блоков - топ "
    custom-class="drawer"
  >
    Список блоков - топ
  </el-drawer>
</template>

<script>
/**
 * Список блоков - топ
 */
export default {
  methods: {
    onClose() {
      this.$store.commit('siteConstructor/page/options/SWITCH_DRAWNER', {
        dranwer: 'drawerSectionTop',
        status: false
      })
    }
  }
}
</script>
