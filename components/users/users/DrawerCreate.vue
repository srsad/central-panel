<template>
  <el-drawer
    :visible.sync="drawer"
    :with-header="false"
    :before-close="() => $emit('closeDrawner', false)"
    title="Создать нового пользоватлея"
  >
    <p>Тут форма</p>
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
