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
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Обновить
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateBrand',

  data() {
    return {
      loading: false,
      formData: {
        name: '',
        _id: ''
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
        dranwer: 'windowUpdateBrand',
        status: false
      })
      this.clearForm()
    },

    onOpen() {
      const selectBrand = this.$store.state.repair.brand.selectBrand
      this.formData = JSON.parse(JSON.stringify(selectBrand))
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
        await this.$axios.$put(
          '/api/v1/repair/brand/update/' + this.formData._id,
          this.formData
        )
        // обновлять список деталей кактегории
        this.$store.dispatch('repair/brand/fetchItems')
        this.onClose()
        await this.$notify({
          message: 'Бренд успушно обнавлен!',
          customClass: 'success-notyfy'
        })
      } catch (error) {
        console.error('Не удалось обновить бренд', error.response)
        this.$store.commit('SET_ERROR', error.response.data.message)
      } finally {
        this.loading = false
      }
    },

    clearForm() {
      this.formData.name = ''
      this.formData._id = ''
      this.$store.commit('repair/brand/SET_SELECT_BRAND', null)
    }
  }
}
</script>
