<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerAddDevice"
    :before-close="onClose"
    :title="title"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row"
    >
      <div class="col-8">
        <div class="row">
          <!-- name -->
          <div class="col-7">
            <el-form-item prop="name">
              <el-input
                v-model="form.name"
                :disabled="disabledItem"
                placeholder="Наименование"
              />
            </el-form-item>
          </div>
          <!-- end name -->
          <!-- series -->
          <div class="col-12">
            <el-form-item prop="series">
              <el-input
                v-model="form.series"
                placeholder="Серия"
                maxlength="255"
                show-word-limit
              />
            </el-form-item>
          </div>
          <!-- end series -->
        </div>
      </div>
      <!-- end content -->
      <div class="col-12 text-right mt-15">
        <el-button
          @click.prevent="validateForm"
          type="success"
          icon="el-icon-plus"
        >
          Добавить
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
        name: '',
        series: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите запись',
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
        ],
        series: [
          {
            required: true,
            message: 'Выберите серию',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    title() {
      return this.form.name ? this.form.name : 'Добавить устроиство'
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
      // уведомляем челиков в телеге || создаем устроиство
      // const url = `https://api.telegram.org/bot1113218700:AAE_XXJyTH4UCWE7_JfZXmVtXVA6Vyns4qE/sendMessage`
      try {
        // await this.$axios.$get(url, {
        //   params: {
        //     chat_id: 479029367,
        //     text: {
        //       name: this.form.name,
        //       series: this.form.series,
        //       longtitle: this.form.longtitle,
        //       description: this.form.description,
        //       content: this.form.content
        //     }
        //   }
        // })
        // this.clearForm()
        // this.onClose()
        // this.$notify({
        //   message: 'Устройство станет доступно в течении пары часов!',
        //   customClass: 'success-notyfy'
        // })
        await console.log('addDevice')
      } catch (e) {
        // this.clearForm()
        // this.onClose()
        this.$store.commit('SET_ERROR', 'Что-то пошло не так!')
      }
    },

    clearForm() {
      this.form.name = ''
      this.form.series = ''
    },

    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerAddDevice',
        status: false
      })
      this.clearForm()
    }
  }
}
</script>

<style lang="sass">
#fileUploader
  display: none
[for="fileUploader"]
  display: block
  margin: 0 auto
  text-align: center
  & i
    font-size: 72px
    cursor: pointer
.img-container
  .el-button--danger
    top: 0
    right: 5px
    position: absolute
</style>
