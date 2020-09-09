<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerCreateOrder"
    :before-close="onClose"
    @open="onOpen"
    :title="title"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row"
    >
      <div class="col-12 text-right mt-15">
        <el-button
          @click.prevent="validateForm"
          type="success"
          icon="el-icon-plus"
        >
          Создать
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {},
      rules: {}
    }
  },
  methods: {
    onOpen() {},
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateOrder',
        status: false
      })
    }
  }
}
</script>
