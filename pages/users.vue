<template>
  <el-container>
    <el-tabs value="users" class="w100">
      <el-tab-pane label="Пользователи" name="users">
        <app-users-panel />
      </el-tab-pane>
      <el-tab-pane label="Роли" name="roles">
        <app-roles-panel />
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import AppRolesPanel from '~/components/users/roles/Panel'
import AppUsersPanel from '~/components/users/users/Panel'

export default {
  components: {
    AppRolesPanel,
    AppUsersPanel
  }
}
</script>
