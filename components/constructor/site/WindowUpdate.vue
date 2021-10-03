<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowConstructorSiteUpdate"
    :before-close="onClose"
    @open="onOpen"
    width="30%"
    title="Обновить"
  >
    <el-form ref="form" :model="form" :disabled="loading" :rules="rules">
      <el-form-item prop="name" label="Наименование">
        <el-input v-model="form.name" />
      </el-form-item>
      <div class="mt-30">
        <el-button @click="update" :loading="loading" type="success">
          Обновить
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
      form: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите наименование',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
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
     * Открытие окна
     */
    onOpen() {
      this.form = {
        ...this.$store.getters['siteConstructor/sites/site']
      }
    },

    /**
     * Закрытие окна
     */
    onClose() {
      this.$store.commit('siteConstructor/sites/SET_SITE', null)

      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowConstructorSiteUpdate',
        status: false
      })
    },

    /**
     * Обновить
     */
    async update() {
      await this.$refs.form.validate(async (valid) => {
        if (!valid) return false

        console.log('res 2')

        this.loading = true
        try {
          const formData = JSON.parse(JSON.stringify(this.form))
          const res = await this.$store.dispatch(
            'siteConstructor/sites/updateItem',
            formData
          )

          if (res) {
            await this.$store.dispatch('siteConstructor/sites/fetchItems')
            this.$notify({
              message: 'Создание прошло успушно!',
              customClass: 'success-notyfy'
            })
          }
          this.clearForm()
          this.onClose()
        } catch (e) {
          console.log('error', e)
        } finally {
          this.loading = false
        }
      })
    },

    /**
     * Отчистка формы
     */
    clearForm() {
      this.form = {
        name: ''
      }
    }
  }
}
</script>
