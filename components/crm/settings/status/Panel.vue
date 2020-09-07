<template>
  <div class="row">
    <div class="col-12">
      <el-button
        v-if="$abilities('crm-settings-status-create')"
        @click="
          $store.commit('settings/SWITCH_DRAWNER', {
            dranwer: 'drawerCRMCreateStatus',
            status: true
          })
        "
        size="mini"
        type="success"
        class="mb-20"
        icon="el-icon-plus"
      >
        Добавить статус
      </el-button>

      <h5>Статусы сделок - новые</h5>
      <app-status-item :items="statuses | getStatus('new')" />
      <hr />
      <h5>Статусы сделок - на исполнении</h5>
      <app-status-item :items="statuses | getStatus('inwork')" />
      <hr />
      <h5>Статусы сделок - готовые</h5>
      <app-status-item :items="statuses | getStatus('ready')" />
      <hr />
      <h5>Статусы сделок - закрытые успешно</h5>
      <app-status-item :items="statuses | getStatus('successful')" />
      <hr />
      <h5>Статусы сделок - отложенные</h5>
      <app-status-item :items="statuses | getStatus('deferred')" />
      <hr />
      <h5>Статусы сделок - отказные</h5>
      <app-status-item :items="statuses | getStatus('rejection')" />
      <hr />
    </div>
    <app-drawer-create />
    <app-drawer-update />
  </div>
</template>

<script>
import AppDrawerCreate from '~/components/crm/settings/status/drawer/Create'
import AppDrawerUpdate from '~/components/crm/settings/status/drawer/Update'
import AppStatusItem from '~/components/crm/settings/status/Item'

export default {
  components: {
    AppDrawerCreate,
    AppDrawerUpdate,
    AppStatusItem
  },
  filters: {
    getStatus(val, type) {
      if (!type) return val
      return val?.filter((el) => el.type === type)
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    statuses() {
      return this.$store.getters['crm/settings/statuses']
    }
  },
  mounted() {
    this.$store.dispatch('crm/settings/fetchItems')
  }
}
</script>
