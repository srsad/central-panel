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
          size="mini"
          class="mb-20"
          icon="el-icon-plus"
        >
          Добавить домен
        </el-button>
        <el-button-group>
          <el-button
            @click="selectCity('Красноармейская')"
            size="mini"
            type="primary"
          >
            2-я Красноармейская 11
          </el-button>
          <!-- <el-button
            @click="selectCity('Пашковская')"
            size="mini"
            type="primary"
          >
            ул. Пашковская 83
          </el-button> -->
          <el-button
            @click="selectCity('Новослободская')"
            size="mini"
            type="primary"
          >
            ул. Новослободская 71
          </el-button>
          <el-button
            @click="selectCity('Армянский')"
            size="mini"
            type="primary"
          >
            Армянский пер.
          </el-button>
          <el-button
            @click="selectCity('Дмитровский')"
            size="mini"
            type="primary"
          >
            Дмитровский пер., 8
          </el-button>
          <el-button
            @click="() => $store.dispatch('domains/fetchDomains')"
            size="mini"
            type="primary"
            icon="el-icon-close"
            title="Сбросить"
            style="padding: 9px 9px 5px 5px"
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
