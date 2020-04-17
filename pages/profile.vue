<template>
  <div class="row w100 mt-15">
    <div class="col-lg-4">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :disabled="loading"
        class="row"
      >
        <div class="col-12">
          <h3 class="mb-20">Обновить данные пользоватлея</h3>
        </div>
        <div class="col-6">
          <el-form-item prop="login">
            <el-input v-model="form.login" placeholder="Логин" />
          </el-form-item>
        </div>
        <div class="col-6">
          <el-form-item prop="fullname">
            <el-input v-model="form.fullname" placeholder="Ф.И.О." />
          </el-form-item>
        </div>
        <div class="col-6">
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="Email" />
          </el-form-item>
        </div>
        <div class="col-6">
          <el-form-item prop="phone">
            <el-input
              v-model="form.phone"
              v-mask="'+7(###)###-##-##'"
              placeholder="Номер телефона"
            />
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item prop="description">
            <el-input
              :rows="3"
              v-model="form.description"
              maxlength="255"
              show-word-limit
              type="textarea"
              placeholder="Описание"
            />
          </el-form-item>
        </div>
        <div class="col-6">
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="Пароль"
              show-password
            />
          </el-form-item>
        </div>
        <div class="col-6 text-right">
          <el-button @click="validateForm" :loading="loading" type="success">
            Обновить
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        login: '',
        fullname: '',
        email: '',
        phone: '',
        password: '',
        active: true,
        description: ''
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
        fullname: [
          {
            required: true,
            message: 'Введите ФИО',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 5 символов',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: 'Введите номер телефона',
            trigger: 'blur'
          },
          {
            min: 16,
            message: 'Слишком короткий номер',
            trigger: 'blur'
          }
        ],
        password: [
          {
            min: 6,
            message: 'Минимум 6 символов',
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            message: 'Введите корректный email'
          },
          {
            required: true,
            message: 'Введите email',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: 'Выберите роль',
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.$store.getters['auth/user']))
    this.form.phone = this.phoneFormater(this.form.phone)
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
        const formData = new FormData()
        formData.append('_id', this.form._id)
        formData.append('login', this.form.login)
        formData.append('fullname', this.form.fullname)
        if (this.form.password) {
          formData.append('password', this.form.password)
        }
        formData.append('email', this.form.email)
        formData.append('description', this.form.description)
        formData.append('phone', this.form.phone.replace(/\+|\(|\)|-/gm, ''))
        await this.$store.dispatch('users/updateUser', formData)
        const user = await this.$axios.$get('/api/v1/user/get/' + this.form._id)
        this.$store.dispatch('auth/setUser', user)
        this.$notify({
          message: 'Данные успешно обновленны!',
          customClass: 'success-notyfy'
        })
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    phoneFormater(phone) {
      const result = []
      if (phone) {
        phone = '' + phone
        for (let i = 0; phone.length - 1 >= i; i++) {
          if (i === 0) {
            phone = phone.substr(1)
            result.push('+7(')
          } else if (i === 3) {
            result.push(')')
          } else if (i === 6 || i === 8) {
            result.push('-')
          }
          result.push(phone[i])
        }
      }
      return result.join('')
    }
  }
}
</script>
