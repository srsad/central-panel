<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerUpdateNotRecording"
    :before-close="onClose"
    @opened="onOpen"
    width="30%"
    title="Редактировать"
  >
    <div
      v-loading="!loadContent"
      v-if="!loadContent"
      class="mt-100"
      element-loading-text="Загрузка..."
      element-loading-spinner="el-icon-loading"
    />
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      :class="['row', !loadContent ? 'd-none' : '']"
    >
      <div class="col-12">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Наименование" />
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" :class="['dialog-footer', !loadContent ? 'd-none' : '']">
      <el-button @click="onClose">Закрыть</el-button>
      <el-button @click="validateForm" type="success">Обновить</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadContent: false,
      form: {
        _id: '',
        name: ''
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
        ]
      }
    }
  },
  methods: {
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
          '/api/v1/recording/not/update/' + this.form._id,
          this.form
        )
        this.clearForm()
        this.$notify({
          message: 'Запись успушно обновленна!',
          customClass: 'success-notyfy'
        })
        await this.$store.dispatch('recording/fetchNotRecording')
        this.onClose()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    clearForm() {
      this.form.name = ''
      this.form._id = ''
      this.loading = false
    },
    onOpen() {
      this.form = { ...this.$store.state.recording.editNotRecording }
      this.loadContent = true
    },
    onClose() {
      this.$store.commit('source/control/SET_SOURCE', null)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateNotRecording',
        status: false
      })
      this.loadContent = false
    }
  }
}
</script>
