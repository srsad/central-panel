<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowConstructorSiteCreate"
    :before-close="onClose"
    width="30%"
    title="Создать"
  >
    <el-form ref="form" :model="form" :disabled="loading" :rules="rules">
      <el-form-item prop="name" label="Наименование">
        <el-input v-model="form.name" />
      </el-form-item>
      <div class="mt-30">
        <el-button @click="create" type="success">
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
      form: {
        name: ''
        // branch: ''
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
     * Создание сайта в конструкторе
     */
    async create() {
      await this.$refs.form.validate(async (valid) => {
        if (!valid) return false
        this.loading = true

        try {
          const formData = JSON.parse(JSON.stringify(this.form))
          const res = await this.$store.dispatch(
            'siteConstructor/sites/createItem',
            { formData }
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
        } finally {
          this.loading = false
        }
      })
    },

    /**
     * Закртие модального окна создания
     */
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowConstructorSiteCreate',
        status: false
      })
      this.clearValidate()
    },

    /**
     * Очищение данных формы
     */
    clearForm() {
      this.form.name = ''
      this.form.branch = ''
      this.clearValidate()
    },

    /**
     * Обновление формы
     */
    clearValidate(field) {
      try {
        this.$refs.form.clearValidate(field || '')
      } catch (e) {}
    }
  }
}
</script>
