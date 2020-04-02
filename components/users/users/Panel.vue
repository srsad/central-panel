<template>
  <div>
    <el-button
      @click="
        $store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreateUser',
          status: true
        })
      "
      type="success"
      class="mb-20"
      icon="el-icon-plus"
    >
      Добаивть пользователя
    </el-button>
    <!--  -->
    <div class="w97">
      <app-list :items="$store.getters['users/users']" />
    </div>
    <!--  -->
    <app-drawer-create />
    <app-drawer-update />
  </div>
</template>

<script>
import AppDrawerCreate from '~/components/users/users/DrawerCreate'
import AppDrawerUpdate from '~/components/users/users/DrawerUpdate'
import AppList from '~/components/users/users/List'

export default {
  components: {
    AppDrawerCreate,
    AppDrawerUpdate,
    AppList
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>
