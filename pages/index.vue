<template>
  <div class="row">
    <div class="col-12">
      <app-panel />
    </div>
  </div>
</template>

<script>
import AppPanel from '~/components/callcenter/brand/Panel'

export default {
  components: {
    AppPanel
  },

  mounted() {
    this.$store.dispatch('settings/setBreadcrumbs', [])
  }
}
</script>
