<template>
  <div class="row w100 mt-15">
    <div class="col-8 mt-10 mb-10">
      <h3>Домены</h3>
    </div>
    <div class="col-11">
      <app-domains-panel v-if="$abilities('domains')" />
    </div>
  </div>
</template>

<script>
import AppDomainsPanel from '~/components/domains/Panel'

export default {
  components: {
    AppDomainsPanel
  },
  async fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/domains',
        label: 'Управление доменными именами'
      }
    ])
    try {
      // загрузка списка доменных имен
      if (store.getters['domains/domains'].length === 0) {
        await store.dispatch('domains/fetchDomains')
      }
    } catch (e) {
      error(e)
    }
  }
}
</script>
