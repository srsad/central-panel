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
  },
  async fetch({ store, error }) {
    try {
      // загрузка ролей
      if (store.getters['users/roles'].length === 0) {
        await store.dispatch('users/fetchRoles')
      }
      // загрузка пользователей
      if (store.getters['users/users'].length === 0) {
        await store.dispatch('users/fetchUsers')
      }
    } catch (e) {
      error(e)
    }
  }
}
</script>
