<template>
  <div>
    <el-button
      @click="drawer = true"
      type="success"
      class="mb-20"
      icon="el-icon-plus"
    >
      Добаивть пользователя
    </el-button>
    <!--  -->
    <app-list />
    <!--  -->
    <app-drawer
      :drawer="drawer"
      @closeDrawner="(status) => (drawer = status)"
    />
  </div>
</template>

<script>
import AppDrawer from '~/components/users/users/Drawer'
import AppList from '~/components/users/users/List'

export default {
  components: {
    AppDrawer,
    AppList
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>
