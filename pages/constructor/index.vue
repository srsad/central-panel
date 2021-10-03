<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <app-sites-panel v-if="$abilities('constructor')" />
    </div>
  </div>
</template>

<script>
import AppSitesPanel from '~/components/constructor/site/Panel'

export default {
  components: {
    AppSitesPanel
  },
  async fetch({ store }) {
    if (store.getters['siteConstructor/sites/sites'].length === 0) {
      await store.dispatch('siteConstructor/sites/fetchItems')
    }
  }
}
</script>
