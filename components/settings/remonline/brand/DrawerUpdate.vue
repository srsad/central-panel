<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerReportSummarySheetUpdateBrand"
    :with-header="false"
    :before-close="close"
    @open="onOpen"
    title="Редактировать бренд"
    custom-class="drawer"
  >
    <div
      v-loading="!loadContent"
      v-if="loadContent === false"
      class="mt-100"
      element-loading-text="Загрузка..."
      element-loading-spinner="el-icon-loading"
    />
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      :class="['row m-15', !loadContent ? 'd-none' : '']"
    >
      <div class="col-12">
        <h3 class="mb-20">Редактировать бренд</h3>
      </div>
      <div class="col-6">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Бренд" />
        </el-form-item>
      </div>
      <div class="col-6 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Редактировать
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      loadContent: false,
      loading: false,
      form: {
        _id: '',
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Бренд',
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
        return valid ? this.onUpdate() : false
      })
    },
    async onUpdate() {
      this.loading = true
      try {
        const formData = this.form
        await this.$axios.$put(
          '/api/v1/report/brand/update/' + formData._id,
          formData
        )
        await this.$store.dispatch('report/brand/fetchItems')
        this.$notify({
          message: 'Бренд обновлен!',
          customClass: 'success-notyfy'
        })
        this.clearForm()
        this.close()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message, { root: true })
      } finally {
        this.loading = false
      }
    },
    onOpen() {
      // загружаем данные
      const { name, _id } = JSON.parse(
        JSON.stringify(this.$store.getters['report/brand/brand'])
      )
      this.form.name = name
      this.form._id = _id
      this.loadContent = true
    },
    onLoadContent() {
      this.loadContent = true
    },
    clearForm() {
      this.form.name = ''
      this.form._id = ''
      this.loading = false
      this.loadContent = false
    },
    close() {
      this.loadContent = false
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportSummarySheetUpdateBrand',
        status: false
      })
    }
  }
}
</script>
