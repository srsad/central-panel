<template>
  <div>
    <el-button
      @click="
        $store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreateDomains',
          status: true
        })
      "
      type="success"
      class="mb-20"
      icon="el-icon-plus"
    >
      Добаивть домен
    </el-button>
    <el-button
      @click="checkStatus"
      type="primary"
      icon="el-icon-refresh-left"
      circle
      title="Проверить статус сайтов"
    />
    <!--  -->
    <app-list :items="$store.getters['domains/domains']" />
    <!--  -->
    <app-drawer-create />
    <app-drawer-update />
  </div>
</template>

<script>
import AppDrawerCreate from '~/components/domains/DrawerCreate'
import AppDrawerUpdate from '~/components/domains/DrawerUpdate'
import AppList from '~/components/domains/List'

export default {
  components: {
    AppDrawerCreate,
    AppDrawerUpdate,
    AppList
  },
  methods: {
    checkStatus() {
      console.log('check domain status')
    }
  }
}
</script>
