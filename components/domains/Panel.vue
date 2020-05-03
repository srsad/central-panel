<template>
  <div>
    <div class="row">
      <div class="col-8">
        <el-button
          v-if="$abilities('domains-create')"
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
          Добавить домен
        </el-button>
      </div>
      <div class="col-4 text-right">
        <p class="mt-25" style="margin-right:5px">
          Всего: <b>{{ $store.getters['domains/domains'].length }}</b>
        </p>
      </div>
    </div>
    <!-- <el-button
      @click="checkStatus"
      type="primary"
      icon="el-icon-refresh-left"
      circle
      title="Проверить статус сайтов"
    /> -->
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
