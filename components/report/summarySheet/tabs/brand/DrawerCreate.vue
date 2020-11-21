<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerReportSummarySheetCreateBrand"
    :with-header="false"
    :before-close="onClose"
    custom-class="drawer"
    title="Добавить бренд"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
    >
      <div class="col-12">
        <h3 class="mb-20">Добавить бренд</h3>
      </div>
      <div class="col-6">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Бренд" />
        </el-form-item>
      </div>
      <div class="col-6 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Добавить
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите наименование бренда',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Минимум 2 символа',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onCreate()
        } else {
          return false
        }
      })
    },
    async onCreate() {
      this.loading = true
      try {
        await this.$axios.$post('/api/v1/report/brand/create', this.form)
        this.$store.dispatch('report/brand/fetchItems')
        this.clearForm()
        this.$notify({
          message: 'Бренд успушно создан!',
          customClass: 'success-notyfy'
        })
        this.onClose()
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    clearForm() {
      this.form.name = ''
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportSummarySheetCreateBrand',
        status: false
      })
    }
  }
}
</script>
