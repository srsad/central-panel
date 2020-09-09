<template>
  <div class="row">
    <div class="col-12">
      <el-button
        v-if="$abilities('crm-orders-create')"
        @click="
          $store.commit('settings/SWITCH_DRAWNER', {
            dranwer: 'drawerCreateOrder',
            status: true
          })
        "
        size="mini"
        type="success"
        class="mb-20"
        icon="el-icon-plus"
      >
        Создать заказ
      </el-button>
    </div>
    <app-drawer-create-order />
  </div>
</template>

<script>
import AppDrawerCreateOrder from '~/components/crm/orders/drawer/Create'

export default {
  components: {
    AppDrawerCreateOrder
  }
}
</script>
