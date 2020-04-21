<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerCreateForRecording"
    :before-close="onClose"
    width="40%"
    title="Техника для записи"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row"
    >
      <div class="col-6">
        <el-form-item prop="name" label="Наименование">
          <el-input v-model="form.name" placeholder="Наименование" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="category" label="Категория">
          <el-select
            v-model="form.category"
            class="w100"
            placeholder="Категория"
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="rservice" label="Rservice">
          <el-input v-model="form.rservice" placeholder="Rservice" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="impuls" label="Impuls">
          <el-input v-model="form.impuls" placeholder="Impuls" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="krd" label="Краснодар">
          <el-input v-model="form.krd" placeholder="Краснодар" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="elservice" label="Выездной сервис">
          <el-input v-model="form.elservice" placeholder="Выездной сервис" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="curser">
          <el-checkbox v-model="form.curser">Курьер платный</el-checkbox>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:-60px">
      <el-button @click="onClose" :loading="loading">Закрыть</el-button>
      <el-button @click="validateForm" :loading="loading" type="success">
        Создать
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        category: '',
        rservice: '',
        impuls: '',
        krd: '',
        elservice: '',
        curser: true
      },
      categories: [
        { value: 'Крупная Бытовая Техника' },
        { value: 'Мелкая Бытовая Техника' },
        { value: 'Электротранспорт' },
        { value: 'Электрика' },
        { value: 'Цифровая техника' }
      ],
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
        category: [
          {
            required: true,
            message: 'Выберите категорию',
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
        await this.$axios.$post('/api/v1/recording/for/create/', this.form)
        this.clearForm()
        this.$notify({
          message: 'Запись успушно создана!',
          customClass: 'success-notyfy'
        })
        await this.$store.dispatch('recording/fetchForRecording')
        this.onClose()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    clearForm() {
      this.form.name = ''
      this.form.category = ''
      this.form.rservice = ''
      this.form.impuls = ''
      this.form.krd = ''
      this.form.elservice = ''
      this.form.curser = true
      this.loading = false
    },
    onClose() {
      this.$store.commit('source/control/SET_SOURCE', null)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateForRecording',
        status: false
      })
    }
  }
}
</script>
