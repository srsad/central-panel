<template>
  <el-container>
    map
  </el-container>
</template>

<script>
export default {
  fetch({ store }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/map',
        label: 'Тепловые карты'
      }
    ])
  }
}
</script>
