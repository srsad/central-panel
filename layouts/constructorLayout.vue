<template>
  <div>
    <app-panel-nav />
    <nuxt />
    <app-panel-main />
    <app-drawer-section-top />
    <app-drawer-section-menu />
    <app-drawer-section-cover />
  </div>
</template>

<script>
import AppPanelNav from '~/components/constructor/page/panel/Nav.vue'
import AppPanelMain from '~/components/constructor/page/panel/Main.vue'
import AppDrawerSectionTop from '~/components/constructor/page/panel/section/Top.vue'
import AppDrawerSectionMenu from '~/components/constructor/page/panel/section/Menu.vue'
import AppDrawerSectionCover from '~/components/constructor/page/panel/section/Cover.vue'

export default {
  middleware: ['auth'],
  components: {
    AppPanelNav,
    AppPanelMain,
    AppDrawerSectionTop,
    AppDrawerSectionMenu,
    AppDrawerSectionCover
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    async error(value) {
      if (value === null) return
      await this.$notify({
        title: 'Ошибка',
        message: value,
        customClass: 'error-notyfy'
      })
      this.$store.commit('CLEAR_ERROR')
    }
  }
}
</script>
