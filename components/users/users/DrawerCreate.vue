<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerCreateUser"
    :with-header="false"
    :before-close="onClose"
    @open="onOpen"
    custom-class="drawer"
    title="Добавить пользоватлея"
  >
    <div
      v-loading="!loadContent"
      v-if="loadContent === false"
      class="mt-100"
      element-loading-text="Загрузка..."
      element-loading-spinner="el-icon-loading"
    />
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      :class="['row m-15', !loadContent ? 'd-none' : '']"
    >
      <div class="col-12">
        <h3 class="mb-20">Добавить пользоватлея</h3>
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
      <div class="col-6">
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="Пароль"
            show-password
          />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="active">
          <el-checkbox v-model="form.active">
            Активный
          </el-checkbox>
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
        <el-form-item prop="role">
          <el-select
            v-model="form.role"
            placeholder="Роль"
            no-data-text="Нет роли"
          >
            <el-option
              v-for="role in roles"
              :key="role._id"
              :label="role.name"
              :value="role._id"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-6 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Создать
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      loadContent: false,
      loading: false,
      form: {
        login: '',
        fullname: '',
        password: '',
        email: '',
        description: '',
        phone: '',
        active: false,
        // avatar: '',
        role: ''
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
            required: true,
            message: 'Введите пароль',
            trigger: 'blur'
          },
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
      },
      // роли
      roles: []
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
        const formData = new FormData()
        formData.append('login', this.form.login)
        formData.append('fullname', this.form.fullname)
        formData.append('password', this.form.password)
        formData.append('email', this.form.email)
        formData.append('description', this.form.description)
        formData.append('phone', this.form.phone.replace(/\+|\(|\)|-/gm, ''))
        formData.append('active', this.form.active)
        // formData.append('avatar', this.form.avatar)
        formData.append('role', this.form.role)
        await this.$store.dispatch('users/createUser', formData)
        this.$store.dispatch('users/fetchUsers')
        this.clearForm()
        this.$notify({
          message: 'Пользователь успушно создан!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreateUser',
          status: false
        })
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    clearForm() {
      this.form.login = ''
      this.form.fullname = ''
      this.form.password = ''
      this.form.email = ''
      this.form.description = ''
      this.form.phone = ''
      this.form.active = false
      this.form.role = ''
      this.loadContent = false
    },
    onLoadContent() {
      this.loadContent = true
    },
    async onOpen() {
      if (this.$store.getters['users/roles'].length === 0) {
        await this.$store.dispatch('users/fetchRoles')
        this.roles = this.$store.getters['users/roles']
      } else {
        this.roles = this.$store.getters['users/roles']
      }
      this.loadContent = true
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateUser',
        status: false
      })
    }
  }
}
</script>
