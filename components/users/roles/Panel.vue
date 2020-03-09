<template>
  <div>
    <el-button
      @click="
        $store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreate',
          status: true
        })
      "
      type="success"
      class="mb-20"
      icon="el-icon-plus"
    >
      Добаивть роль
    </el-button>
    <!--  -->
    <app-list :items="$store.getters['users/roles']" />
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
