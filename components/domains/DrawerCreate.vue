<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerCreateDomains"
    :with-header="false"
    :before-close="onClose"
    title="Добавить домен"
    custom-class="drawer"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
    >
      <div class="col-12">
        <h3 class="mb-20">Добавить домен</h3>
      </div>
      <div class="col-6">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Наименование" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="brand">
          <el-input v-model="form.brand" placeholder="Бренд" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="domain">
          <el-input v-model="form.domain" placeholder="Домен">
            <template slot="prepend">https://</template>
          </el-input>
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item prop="vendor">
          <el-input v-model="form.vendor" placeholder="Исполнитель" />
        </el-form-item>
      </div>
      <div class="col-6 text-left">
        <div class="row align-items-center">
          <div class="col-3">
            <el-form-item prop="color">
              <el-color-picker
                v-model="form.color"
                :predefine="predefineColors"
                placeholder="Цвет"
              />
            </el-form-item>
          </div>
          <div class="col-8" style="margin-bottom:33px">
            {{ form.color }}
          </div>
        </div>
      </div>
      <div class="col-6 text-left">
        <el-form-item prop="status">
          <el-checkbox v-model="form.status">Статус</el-checkbox>
        </el-form-item>
      </div>
      <div class="col-12">
        <el-form-item prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="Описание"
            maxlength="255"
            rows="3"
            show-word-limit
          />
        </el-form-item>
      </div>
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Создать
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
import parseUrl from 'url-parse'

export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        brand: '',
        domain: '',
        vendor: '',
        color: '#ffffff',
        status: false,
        description: ''
      },
      predefineColors: [
        '#ffffff',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ],
      rules: {
        name: [
          {
            required: true,
            message: 'Наименование',
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
        brand: [
          {
            required: true,
            message: 'Бренд',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Минимум 2 символа',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ],
        domain: [
          {
            required: true,
            message: 'Доменное имя',
            trigger: 'blur'
          },
          {
            min: 6,
            message: 'Минимум 6 символа',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ],
        vendor: [
          {
            required: true,
            message: 'Исполнитель',
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
          this.onCreate()
        } else {
          return false
        }
      })
    },
    async onCreate() {
      this.loading = true
      this.form.domain = parseUrl(this.form.domain).hostname
      try {
        const formData = this.form
        await this.$store.dispatch('domains/createDomain', formData)
        this.$store.dispatch('domains/fetchDomains')
        this.clearForm()
        this.$notify({
          message: 'Домен успушно добавлен!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreateDomains',
          status: false
        })
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    clearForm() {
      this.form.name = ''
      this.form.brand = ''
      this.form.domain = ''
      this.form.vendor = ''
      this.form.color = '#ffffff'
      this.form.status = false
      this.form.description = ''
      this.loadContent = false
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateDomains',
        status: false
      })
    }
  }
}
</script>
