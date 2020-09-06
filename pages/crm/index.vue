<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      главная страница CRM
    </div>
  </div>
</template>

<script>
export default {
  fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/crm',
        label: 'CRM'
      }
    ])
  }
}
</script>
