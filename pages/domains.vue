<template>
  <div class="row w100 mt-15">
    <div class="col-12">
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

    // eslint-disable-next-line
    const branches = store.getters['report/branch/branches']

    try {
      if (branches?.length === 0) {
        await store.dispatch('report/branch/fetchItems')
      }

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
