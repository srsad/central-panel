<template>
  <el-drawer
    :visible.sync="drawer"
    :with-header="false"
    :before-close="() => $emit('closeDrawner', false)"
    title="Создать новую роль"
  >
    <p>Название роли</p>
    <p>Список разделов и доступы</p>
  </el-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  }
}
</script>
