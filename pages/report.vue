<template>
  <el-container>
    report
  </el-container>
</template>

<script>
export default {
  fetch({ store }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/report',
        label: 'Отчеты'
      }
    ])
  }
}
</script>
