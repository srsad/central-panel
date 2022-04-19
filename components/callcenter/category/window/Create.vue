<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowCreateCategory"
    :before-close="onClose"
    width="30%"
    title="Добавить категорию"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
    >
      <div class="col-12">
        <el-form-item prop="name" label="Наименование категории">
          <el-input
            v-model="form.name"
            size="mini"
            placeholder="Наименование категории"
          />
        </el-form-item>
      </div>
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Создать
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateCategory',

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
            message: 'Наименование',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Минимум 2 символа',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    /**
     * Закрытие окна
     */
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowCreateCategory',
        status: false
      })
      this.clearForm()
    },

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
        const brandId = this.$store.state.repair.brand.brand?._id
        const form = this.form
        form.brand_id = brandId
        await this.$store.dispatch('repair/category/create', this.form)
        this.$store.dispatch('repair/category/fetchItemsById', brandId)
        this.clearForm()
        this.onClose()
        await this.$notify({
          message: 'Категория успушно добавлена!',
          customClass: 'success-notyfy'
        })
      } catch (error) {
        console.log('error', error)
      } finally {
        this.loading = false
      }
    },

    clearForm() {
      this.form.name = ''
    }
  }
}
</script>
