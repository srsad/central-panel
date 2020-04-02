<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item to="/">Главная</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, idx) in breadcrumbs"
      :key="idx"
      :to="{ path: item.uri }"
    >
      {{ item.label }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$store.getters['settings/breadcrumbs']
    }
  }
}
</script>
