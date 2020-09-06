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
        type="success"
        class="mb-20"
        icon="el-icon-plus"
      >
        Добавить статус
      </el-button>

      <h5>Статусы сделок - новые</h5>
      <app-update-form :items="statuses | getStatus('new')" />
      <hr />
      <h5>Статусы сделок - на исполнении</h5>
      <app-update-form :items="statuses | getStatus('inwork')" />
      <hr />
      <h5>Статусы сделок - готовые</h5>
      <app-update-form :items="statuses | getStatus('ready')" />
      <hr />
      <h5>Статусы сделок - закрытые успешно</h5>
      <app-update-form :items="statuses | getStatus('successful')" />
      <hr />
      <h5>Статусы сделок - отложенные</h5>
      <app-update-form :items="statuses | getStatus('deferred')" />
      <hr />
      <h5>Статусы сделок - отказные</h5>
      <app-update-form :items="statuses | getStatus('rejection')" />
      <hr />
    </div>
    <app-drawer-create />
  </div>
</template>

<script>
import AppDrawerCreate from '~/components/crm/settings/status/drawer/Create'
import AppUpdateForm from '~/components/crm/settings/status/drawer/Update'

export default {
  components: {
    AppDrawerCreate,
    AppUpdateForm
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
