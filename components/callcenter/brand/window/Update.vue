<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowUpdateBrand"
    :before-close="onClose"
    @open="onOpen"
    width="30%"
    title="Обновить бренд"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
    >
      <div class="col-12">
        <el-form-item prop="name" label="Бренд">
          <el-input v-model="formData.name" size="mini" placeholder="Бренд" />
        </el-form-item>
      </div>
      <div class="col-12">
        <app-single-image-uploader
          v-model="formData.image"
          :preview="preview"
        />
      </div>
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Обновить
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
      formData: {
        name: '',
        image: '',
        _id: ''
      },
      preview: '',
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
        dranwer: 'windowUpdateBrand',
        status: false
      })
      this.clearForm()
    },

    onOpen() {
      const selectBrand = this.$store.state.repair.brand.selectBrand
      this.formData._id = selectBrand._id
      this.formData.name = selectBrand.name
      this.formData.image = selectBrand?.image
      this.preview = selectBrand?.image
        ? `/site/images/brand${selectBrand?.image}`
        : ''
    },

    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onUpdate()
        } else {
          return false
        }
      })
    },

    async onUpdate() {
      this.loading = true
      try {
        const fd = new FormData()
        fd.append('_id', this.formData._id)
        fd.append('name', this.formData.name)
        fd.append('image', this.formData.image)

        if (this.formData?.image?.raw) {
          this.$axios.setHeader('Content-Type', 'multipart/form-data')
          fd.append('image', this.formData.image.raw)
        }

        console.log('this.formData.', this.formData)

        await this.$axios.$put(
          '/api/v1/repair/brand/update/' + this.formData._id,
          fd
        )
        // обновлять список деталей кактегории
        this.$store.dispatch('repair/brand/fetchItems')
        this.onClose()
        await this.$notify({
          message: 'Бренд успушно обнавлен!',
          customClass: 'success-notyfy'
        })
      } catch (error) {
        console.error('Не удалось обновить бренд', error)
        this.$store.commit('SET_ERROR', error.response.data.message)
      } finally {
        this.loading = false
      }
    },

    clearForm() {
      this.formData.name = ''
      this.formData.image = ''
      this.formData._id = ''
      this.preview = ''
      this.$store.commit('repair/brand/SET_SELECT_BRAND', null)
    }
  }
}
</script>
