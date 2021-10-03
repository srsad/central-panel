<template>
  <div>
    <app-nav-panel />
    <nuxt />
  </div>
</template>

<script>
import AppNavPanel from '~/components/constructor/page/NavPanel.vue'

export default {
  middleware: ['auth'],
  components: {
    AppNavPanel
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
