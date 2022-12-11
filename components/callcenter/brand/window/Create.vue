<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowCreateBrand"
    :before-close="onClose"
    width="30%"
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
        <el-form-item prop="name" label="Бренд">
          <el-input v-model="form.name" size="mini" placeholder="Бренд" />
        </el-form-item>
      </div>
      <div class="col-12">
        <app-single-image-uploader v-model="form.image" />
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
import AppSingleImageUploader from '~/components/common/uploaders/SingleImageUploader'

export default {
  name: 'CreateBrand',

  components: {
    AppSingleImageUploader
  },

  data() {
    return {
      loading: false,
      form: {
        name: '',
        image: ''
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
        dranwer: 'windowCreateBrand',
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
        await this.$store.dispatch('repair/brand/createBrand', this.form)
        // обновлять список деталей кактегории
        await this.$store.dispatch('repair/brand/fetchItems')
        this.clearForm()
        this.onClose()
        await this.$notify({
          message: 'Бренд успушно добавлен!',
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
      this.form.image = ''
    }
  }
}
</script>
