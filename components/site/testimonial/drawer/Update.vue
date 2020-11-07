<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerSiteTestimonialUpdate"
    :with-header="false"
    :before-close="onClose"
    @opened="onOpen"
    title="Обновить отзыв"
    custom-class="drawer"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
    >
      <div class="col-12"><h3 class="mb-20">Обновить отзыв</h3></div>
      <!-- site_url -->
      <el-form-item class="col-6" label="Адрес сайта" prop="site_url">
        <el-input
          v-model="form.site_url"
          size="small"
          placeholder="Адрес сайта"
        />
      </el-form-item>
      <!-- /site_url -->
      <!-- brand -->
      <el-form-item class="col-6" label="Бренд" prop="brand">
        <el-select
          v-model="form.brand"
          size="small"
          placeholder="Бренд"
          class="w100"
          filterable
        >
          <el-option
            v-for="(item, idx) of brands"
            :key="idx"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <!-- /brand -->
      <!-- fullname -->
      <el-form-item class="col-8" label="ФИО" prop="fullname">
        <el-input v-model="form.fullname" size="small" placeholder="ФИО" />
      </el-form-item>
      <!-- /fullname -->
      <!-- order -->
      <el-form-item class="col-4" label="Номер заказа" prop="order">
        <el-input
          v-model="form.order"
          size="small"
          placeholder="Номер заказа"
        />
      </el-form-item>
      <!-- /order -->
      <!-- date -->
      <el-form-item class="col-5" label="Дата" prop="date">
        <!-- <el-input v-model="form.date" size="small" placeholder="Дата" /> -->
        <vue-ctk-date-time-picker
          v-model="form.date"
          :no-label="true"
          :no-button-now="true"
          :only-date="true"
          :format="'DD.MM.YYYY'"
          :formatted="'DD.MM.YYYY'"
          :output-format="'DD.MM.YYYY'"
          input-size="sm"
          class="w100 mt-30"
          label=""
        />
      </el-form-item>
      <!-- /date -->
      <!-- rating -->
      <el-form-item class="col-7" label="Оценка" prop="rating">
        <div class="w100 mt-35">
          <el-rate v-model="form.rating" />
        </div>
      </el-form-item>
      <!-- /rating -->
      <!-- device -->
      <el-form-item class="col-12" label="Устройство" prop="device">
        <el-input v-model="form.device" size="small" placeholder="Устройство" />
      </el-form-item>
      <!-- /device -->
      <!-- testemonial -->
      <el-form-item class="col-12" label="Отзыв" prop="testemonial">
        <el-input
          v-model="form.testemonial"
          type="textarea"
          size="small"
          maxlength="255"
          placeholder="Отзыв"
          show-word-limit
        />
      </el-form-item>
      <!-- /testemonial -->
      <!-- reply -->
      <el-form-item class="col-12" label="Ответ администрации" prop="reply">
        <el-input
          v-model="form.reply"
          type="textarea"
          size="small"
          maxlength="255"
          placeholder="Ответ администрации"
          show-word-limit
        />
      </el-form-item>
      <!-- /reply -->
      <!-- sort_index -->
      <el-form-item class="col-4" prop="sort_index" label="Порядковый номер">
        <el-input-number v-model="form.sort_index" :min="0" size="mini" />
      </el-form-item>
      <!-- /sort_index -->
      <!-- status -->
      <el-form-item class="col-6 mt-25" prop="status">
        <el-checkbox v-model="form.status">
          Активен
        </el-checkbox>
      </el-form-item>
      <!-- /status -->
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Обновить
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
      brands: [], // список брендов
      form: {
        site_url: '',
        brand: '',
        status: true,
        fullname: '',
        order: '',
        sort_index: 0,
        date: '',
        device: '',
        testemonial: '',
        reply: '',
        rating: 5
      },
      rules: {
        site_url: [
          {
            required: true,
            message: 'Введите статус',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символа',
            trigger: 'blur'
          }
        ],
        brand: [
          {
            required: true,
            message: 'Введите бренд',
            trigger: 'blur'
          }
        ],
        fullname: [
          {
            required: true,
            message: 'Введите ФИО',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async mounted() {
    // проверка наличия брендов
    if (this.$store.getters['report/brand/brands'].length === 0) {
      await this.$store.dispatch('report/brand/fetchItems')
    }
    this.brands = this.$store.getters['report/brand/brands']
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.onCreate()
      })
    },
    async onCreate() {
      this.loading = true
      try {
        const formData = this.form
        formData.site_url = this.getSource()

        await this.$store.dispatch('site/testimonial/update', formData)
        this.$notify({
          message: 'Отзыв обновлен!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerSiteTestimonialUpdate',
          status: false
        })
        // Обновляем текущий список отзывов (с выбранным доменным имененм)
        this.$store.dispatch(
          'site/testimonial/fetchTestimonials',
          formData.site_url
        )
        // Обновляем список бренды + домены
        // TODO тут нужна проверка наличия в списке выбранного брнда и сайта
        this.$store.dispatch('site/testimonial/fetchSites')
        this.clearForm()
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    clearForm() {
      this.form.site_url = '' // оставляем таким какой он был, типо запоминаем =)
      this.form.brand = '' // оставляем таким какой он был, типо запоминаем =)
      this.form.status = true
      this.form.fullname = ''
      this.form.order = ''
      this.form.sort_index = 0
      this.form.date = ''
      this.form.device = ''
      this.form.testemonial = ''
      this.form.reply = ''
      this.form.rating = 5

      this.loading = false
    },
    onOpen() {
      // загрузка категорий
      this.form = JSON.parse(
        JSON.stringify(this.$store.getters['site/testimonial/testimonial'])
      )
      this.form.brand = this.form.brand._id
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerSiteTestimonialUpdate',
        status: false
      })
    },
    /**
     * Возвращает отчищенный источник
     */
    getSource() {
      let source = this.form.site_url
      let hostname = ''
      try {
        // eslint-disable-next-line no-new
        source = new URL(source)
      } catch {
        source = 'https://' + source
      }
      hostname = parseUrl(source).hostname
      return hostname
    }
  }
}
</script>
