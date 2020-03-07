<template>
  <div>
    <el-button
      @click="drawer = true"
      type="success"
      class="mb-20"
      icon="el-icon-plus"
    >
      Добаивть роль
    </el-button>
    <!--  -->
    <app-role-list />
    <!--  -->
    <app-role-drawer
      :drawer="drawer"
      @closeDrawner="(status) => (drawer = status)"
    />
  </div>
</template>

<script>
import AppRoleDrawer from '~/components/users/roles/Drawer'
import AppRoleList from '~/components/users/roles/RoleList'

export default {
  components: {
    AppRoleDrawer,
    AppRoleList
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>
