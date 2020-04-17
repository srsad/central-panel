<template>
  <section class="row m-15 justify-content-center">
    <div class="col-11 col-sm-5 col-md-4 col-lg-3 col-xl-2 mt-100">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :disabled="loading"
        class="authBox"
      >
        <h3 class="text-center mb-20">Вход</h3>
        <el-form-item prop="login">
          <el-input v-model="form.login" placeholder="Логин" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="Пароль"
            show-password
          />
        </el-form-item>
        <div class="text-right">
          <el-button
            @click="validateForm('form')"
            :loading="loading"
            type="success"
          >
            Войти
          </el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script>
import * as Fingerprint2 from 'fingerprintjs2'

export default {
  layout: 'auth',
  data() {
    return {
      loading: false,
      form: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          {
            required: true,
            message: 'Введите логин',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Введите пароль',
            trigger: 'blur'
          },
          {
            min: 5,
            message: 'Минимум 5 символов',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onLogin()
        } else {
          return false
        }
      })
    },
    async onLogin() {
      this.loading = true
      const fingerprint = await this.getFingerprint()
      try {
        const formData = this.form
        formData.fingerprint = String(
          Fingerprint2.x64hash128(fingerprint.join(''), 31)
        )
        formData.os = fingerprint[16]
        formData.browser = fingerprint[0]
        await this.$store.dispatch('auth/login', formData)
        this.$router.push('/')
      } catch (e) {
        console.error('Ошибка формы авторизации', e)
      } finally {
        this.loading = false
      }
    },
    async getFingerprint() {
      try {
        const components = await Fingerprint2.getPromise({})
        return components.map((component) => component.value)
      } catch (e) {
        console.error('getHash', e)
      }
    }
  }
}
</script>
