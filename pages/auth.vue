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
        login: 'test',
        password: 'test'
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
        formData.fingerprint = fingerprint
        await this.$store.dispatch('auth/login', formData)
      } catch (e) {
        // this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    async getFingerprint() {
      const options = {
        excludes: {
          plugins: true,
          localStorage: true,
          adBlock: true,
          screenResolution: true,
          availableScreenResolution: true,
          enumerateDevices: true,
          pixelRatio: true,
          doNotTrack: true
        }
      }

      try {
        const components = await Fingerprint2.getPromise(options)
        const values = components.map((component) => component.value)
        return String(Fingerprint2.x64hash128(values.join(''), 31))
      } catch (e) {
        console.error('getHash', e)
      }
    }
  }
}
</script>
