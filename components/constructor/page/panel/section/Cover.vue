<template>
  <el-drawer
    :visible.sync="$store.state.siteConstructor.page.options.drawerSectionCover"
    :with-header="false"
    :before-close="onClose"
    direction="ltr"
    title="Список блоков - Обложка"
    custom-class="drawer"
  >
    Список блоков - Обложка
  </el-drawer>
</template>

<script>
/**
 * Список блоков - Обложка
 */
export default {
  methods: {
    onClose() {
      this.$store.commit('siteConstructor/page/options/SWITCH_DRAWNER', {
        dranwer: 'drawerSectionCover',
        status: false
      })
    }
  }
}
</script>
