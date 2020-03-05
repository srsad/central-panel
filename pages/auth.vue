<template>
  <section>
    <el-row type="flex" justify="center" class="mt-100">
      <el-col :sm="8" :md="6" :lg="5" :xl="4">
        <el-form ref="form" :model="form" :rules="rules" class="authBox">
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="Логин" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Пароль"
            />
          </el-form-item>
          <div class="text-right">
            <el-button
              @click="validateForm('form')"
              :loading="loading"
              type="success"
            >
              Create
            </el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
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
            min: 6,
            message: 'Минимум 6 символов',
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
          this.sendForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sendForm() {
      this.loading = true
      console.log('sendForm submit!')
    }
  }
}
</script>
