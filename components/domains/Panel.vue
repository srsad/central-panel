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
        <el-button-group>
          <el-button @click="selectCity('Красноармейская')" type="primary">
            2-я Красноармейская 11
          </el-button>
          <el-button @click="selectCity('Пашковская')" type="primary">
            ул. Пашковская 83
          </el-button>
          <el-button @click="selectCity('Новослободская')" type="primary">
            ул. Новослободская 71
          </el-button>
          <el-button @click="selectCity('Дмитровский')" type="primary">
            Дмитровский пер., 8
          </el-button>
          <el-button
            @click="() => $store.dispatch('domains/fetchDomains')"
            type="primary"
            icon="el-icon-close"
            title="Сбросить"
            style="padding: 12px 12px 11px 12px"
          />
        </el-button-group>
      </div>
      <div class="col-3 text-right">
        <p class="mt-25" style="margin-right:25px">
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
    selectCity(address) {
      this.$store.dispatch('domains/selectByAddress', address)
    },
    checkStatus() {
      console.log('check domain status')
    }
  }
}
</script>
