<template>
  <el-container>
    <el-tabs :value="activeTab" class="w100">
      <el-tab-pane
        v-if="$abilities('users-user_panel-read')"
        label="Пользователи"
        name="users"
      >
        <app-users-panel />
      </el-tab-pane>
      <el-tab-pane
        v-if="$abilities('users-role_panel-read')"
        label="Роли"
        name="roles"
      >
        <app-roles-panel />
      </el-tab-pane>
      <!-- <el-tab-pane
        v-if="$abilities('users-session_panel-read')"
        label="Активные сессии"
        name="active_sessions"
      >
        <app-active-sessions />
      </el-tab-pane> -->
    </el-tabs>
  </el-container>
</template>

<script>
import AppRolesPanel from '~/components/users/roles/Panel'
import AppUsersPanel from '~/components/users/users/Panel'
// import AppActiveSessions from '~/components/users/sessions/Panel'

export default {
  components: {
    AppRolesPanel,
    AppUsersPanel
    // AppActiveSessions
  },
  computed: {
    activeTab() {
      if (this.$abilities('users-user_panel-read')) return 'users'
      if (this.$abilities('users-role_panel-read')) return 'roles'
      if (this.$abilities('users-session_panel-read')) return 'active_sessions'
      return 'users'
    }
  },
  async fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/users',
        label: 'Управление пользователями и ролями'
      }
    ])

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
