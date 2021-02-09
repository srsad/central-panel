<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerReportBranchUpdate"
    :before-close="onClose"
    @open="onOpen"
    width="35%"
    title="Редактировать"
  >
    <el-form ref="form" :model="form" :disabled="loading" class="row">
      <div class="col-6">
        <el-form-item prop="name" label="Наименование (remonline)">
          <el-input
            v-model="form.name"
            :disabled="true"
            placeholder="Наименование"
          />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="short_code" label="Аббревиатура">
          <el-input
            v-model="form.short_code"
            :disabled="loading"
            placeholder="Аббревиатура"
          />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="realname" label="Наименование">
          <el-input
            v-model="form.realname"
            :disabled="loading"
            placeholder="Наименование"
          />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="address" label="Физический адрес">
          <el-input
            v-model="form.address"
            :disabled="loading"
            placeholder="Физический адрес"
          />
        </el-form-item>
      </div>
      <!--  -->
      <div class="col-12 text-right">
        <el-button @click="update" type="success" size="mini">
          Обновить
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      form: {}
    }
  },
  methods: {
    /**
     * Закрытие окна
     */
    onClose() {
      // не закрываем если данные все еще обновляются
      if (this.loading) return true
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportBranchUpdate',
        status: false
      })
    },

    /**
     * При открытии
     */
    onOpen() {
      this.form = JSON.parse(JSON.stringify(this.item))
    },

    /**
     * Обновление
     */
    async update() {
      this.loading = true
      try {
        await this.$axios.$put(
          `/api/v1/report/branch/update/${this.form._id}`,
          this.form
        )
        await this.$notify({
          message: 'Данные обновлены!',
          customClass: 'success-notyfy'
        })
        this.$emit('edit')
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
