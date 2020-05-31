<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerCreateDomains"
    :with-header="false"
    :before-close="onClose"
    @open="onOpen"
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
      <div class="col-12"><h3 class="mb-20">Добавить домен</h3></div>
      <div class="col-12">
        <el-tabs value="data">
          <!-- data -->
          <el-tab-pane label="Общие данные" name="data" class="row">
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
              <el-form-item prop="city">
                <el-select v-model="form.city" placeholder="Город" class="w100">
                  <el-option
                    v-for="item in cities"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  />
                </el-select>
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
            <div class="col-6">
              <el-form-item prop="vendor">
                <el-input v-model="form.vendor" placeholder="Исполнитель" />
              </el-form-item>
            </div>
            <div class="col-6">
              <el-form-item prop="company">
                <el-select
                  v-model="form.company"
                  placeholder="Компания"
                  class="w100"
                >
                  <el-option
                    v-for="(item, idx) in companyes"
                    :key="idx"
                    :label="item"
                    :value="item"
                  />
                </el-select>
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
          </el-tab-pane>
          <!-- end data -->
          <!-- analytics -->
          <el-tab-pane label="Аналитика" name="analytics" class="row">
            <div class="col-4">
              <el-form-item prop="priority" label="Приоритет">
                <el-input-number
                  v-model="form.priority"
                  :min="0"
                  :max="10"
                  size="mini"
                  controls-position="right"
                />
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item prop="login" label="Логин">
                <el-input
                  v-model="form.accaunts.login"
                  size="mini"
                  placeholder="Логин"
                />
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item prop="password" label="Пароль">
                <el-input
                  v-model="form.accaunts.password"
                  placeholder="Пароль"
                  size="mini"
                  show-password
                />
              </el-form-item>
            </div>
            <div class="col-12">
              <el-form-item prop="yametrika" label="Yandex метрика">
                <el-input
                  v-model="form.yametrika"
                  type="textarea"
                  placeholder="Yandex метрика"
                  rows="2"
                  show-word-limit
                />
              </el-form-item>
              <!-- TODO тут выводить в lable - id счетчика -->
              <!-- TODO выводить статус -->
            </div>
            <div class="col-12">
              <el-form-item prop="analytics" label="Google analytics">
                <el-input
                  v-model="form.analytics"
                  type="textarea"
                  placeholder="Google analytics"
                  rows="2"
                  show-word-limit
                />
              </el-form-item>
              <!-- TODO тут выводить в lable - id счетчика  -->
              <!-- TODO выводить статус -->
            </div>
            <!--  -->
            <div class="col-12">
              <el-form-item prop="alloka" label="Alloka">
                <el-input v-model="form.alloka" placeholder="Alloka" />
              </el-form-item>
            </div>
            <div class="col-12">
              <el-form-item prop="envybox" label="Envybox">
                <el-input v-model="form.envybox" placeholder="Envybox" />
              </el-form-item>
            </div>
          </el-tab-pane>
          <!-- end analytics -->
          <!-- contacts -->
          <el-tab-pane label="Контакты" name="contacts" class="row">
            <div class="col-12">
              <el-form-item prop="phone_default" label="Телефон по умолчанию">
                <el-input v-model="form.phone_default" placeholder="Телефон" />
              </el-form-item>
            </div>
            <div class="col-12">
              <el-form-item prop="phone" label="Номер телефона/визитка">
                <el-input v-model="form.phone" placeholder="Телефон" />
              </el-form-item>
            </div>
            <div class="col-12">
              <el-form-item prop="address" label="Адрес">
                <el-input v-model="form.address" placeholder="Адрес" />
              </el-form-item>
            </div>
            <div class="col-12">
              <el-form-item prop="work_time" label="Время работы">
                <el-input v-model="form.work_time" placeholder="Время работы" />
              </el-form-item>
            </div>
            <div class="col-12">
              <el-form-item prop="map_script" label="Код карты">
                <el-input v-model="form.map_script" placeholder="Код карты" />
              </el-form-item>
            </div>
          </el-tab-pane>
          <!-- end contacts -->
        </el-tabs>
      </div>
      <div class="col-6">
        <el-button
          @click="getSourceOptions"
          :loading="loading"
          :title="'Получить данные из источника'"
          type="info"
        >
          Получить данные
        </el-button>
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
import parseUrl from 'url-parse'

export default {
  data() {
    return {
      loading: false,
      form: {
        // общие
        name: '',
        brand: '',
        city: '',
        domain: '',
        vendor: '',
        color: '#ffffff',
        status: false,
        company: '',
        description: '',
        // аналитика
        priority: 0,
        accaunts: {
          login: '',
          password: ''
        },
        yametrika: '',
        analytics: '',
        alloka: '',
        envybox: '',
        // контакты
        address: '',
        work_time: '',
        map_script: '',
        phone_default: '',
        phone: ''
      },
      cities: [],
      companyes: ['R-Service', 'Impuls'],
      predefineColors: [
        '#000000',
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
        const formData = this.form
        formData.domain = this.getSource()
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
    onOpen() {
      // загружаем список городов
      this.cities = JSON.parse(
        JSON.stringify(this.$store.getters['city/сityes'])
      )
    },
    clearForm() {
      this.form.name = ''
      this.form.brand = ''
      this.form.city = ''
      this.form.domain = ''
      this.form.vendor = ''
      this.form.color = '#ffffff'
      this.form.status = false
      this.form.company = ''
      this.form.description = ''
      this.form.priority = 0
      this.form.accaunts.login = ''
      this.form.accaunts.password = ''
      this.form.yametrika = ''
      this.form.analytics = ''
      this.form.alloka = ''
      this.form.envybox = ''
      this.form.address = ''
      this.form.map_script = ''
      this.form.work_time = ''
      this.form.phone_default = ''
      this.form.phone = ''

      this.loading = false
      this.loadContent = false
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateDomains',
        status: false
      })
    },
    /** Возвращает отчищенный источник */
    getSource() {
      let source = this.form.domain
      let hostname = ''
      try {
        // eslint-disable-next-line no-new
        new URL(source)
      } catch {
        source = 'https://' + source
      }
      hostname = parseUrl(source).hostname
      return hostname
    },
    /** Получаем данные источника */
    async getSourceOptions() {
      const source = this.getSource()
      try {
        this.$axios.setToken(false)
        const option = await this.$axios.$get(
          `https://${source}/rest/?get=options`
        )

        if (option.address) this.form.address = option.address
        if (option.alloka) this.form.alloka.code = option.alloka
        if (option.analytics) this.form.analytics.code = option.analytics
        if (option.envybox) this.form.envybox.code = option.envybox
        if (option.map_script) this.form.map_script = option.map_script
        if (option.phone_default) this.form.phone_default = option.phone_default
        if (option.work_time) this.form.work_time = option.work_time
        if (option.yametrika) this.form.yametrika.code = option.yametrika
      } catch (e) {
        this.$store.commit(
          'SET_ERROR',
          `Не удалось получить данные из источника ${source}`,
          { root: true }
        )
      } finally {
        this.$store.dispatch('settings/setToken')
      }
    }
  }
}
</script>

<style>
.el-tabs__item:focus.is-active.is-focus:not(:active) {
  box-shadow: 0 0 0 0 #fff inset !important;
}
</style>
