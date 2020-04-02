<template>
  <div class="row w100" style="margin-top:15px;">
    <div class="col-12">
      <app-domains-panel />
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
      // TODO вызывать общий стор ошибок
    }
  }
}
</script>
