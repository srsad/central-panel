<template>
  <div>
    <el-button
      v-if="$abilities('users-role_panel-create')"
      @click="
        $store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreateRole',
          status: true
        })
      "
      type="success"
      class="mb-20"
      icon="el-icon-plus"
    >
      Добавить роль
    </el-button>
    <!--  -->
    <div class="w97">
      <app-list :items="$store.getters['users/roles']" />
    </div>
    <!--  -->
    <app-drawer-create />
    <app-drawer-update />
  </div>
</template>

<script>
import AppDrawerCreate from '~/components/users/roles/DrawerCreate'
import AppDrawerUpdate from '~/components/users/roles/DrawerUpdate'
import AppList from '~/components/users/roles/List'

export default {
  components: {
    AppDrawerCreate,
    AppDrawerUpdate,
    AppList
  }
}
</script>
