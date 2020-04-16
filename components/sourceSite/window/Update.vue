<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerUpdateSource"
    :before-close="onClose"
    @opened="onOpen"
    width="30%"
    title="Редактировать источник"
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
      <div class="col-6">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Наименование" />
        </el-form-item>
        <!--  -->
        <el-form-item prop="source">
          <el-input v-model="form.source" placeholder="Домен">
            <template slot="prepend">https://</template>
          </el-input>
        </el-form-item>
        <!--  -->
        <el-form-item prop="brand">
          <!-- TODO странное поведение autocomplete + validate -->
          <el-autocomplete
            v-model="form.brand"
            :fetch-suggestions="querySearchBrand"
            @select="handleSelectBrand"
            class="inline-input w100"
            placeholder="Бренд"
          />
        </el-form-item>
        <!--  -->
        <el-form-item prop="company">
          <el-select v-model="form.company" placeholder="Компания" class="w100">
            <el-option
              v-for="item in companies"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-6">
        <app-single-image-uploader v-model="form.image" :preview="preview" />
        <div class="text-center mt-30">
          <el-form-item prop="published">
            <el-checkbox v-model="form.published">Опубликован</el-checkbox>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div slot="footer" :class="['dialog-footer', !loadContent ? 'd-none' : '']">
      <el-button @click="onClose">Закрыть</el-button>
      <el-button @click="validateForm" type="success">Обновить</el-button>
    </div>
  </el-dialog>
</template>

<script>
/* eslint-disable prettier/prettier */
import parseUrl from 'url-parse'
import AppSingleImageUploader from '~/components/common/uploaders/SingleImageUploader'

export default {
  components: {
    AppSingleImageUploader
  },
  props: {
    company: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      loadContent: false,
      form: {
        _id: '',
        name: '',
        source: '',
        company: '',
        brand: '',
        published: true,
        image: ''
      },
      preview: '',
      companies: [
        {
          value: 'rservice',
          label: 'Rservice'
        },
        {
          value: 'impuls',
          label: 'Impuls'
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: 'Наименование',
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
        source: [
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
        company: [
          {
            required: true,
            message: 'Выберите компанию',
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
        ]
      }
    }
  },
  computed: {
    brands() {
      return this.$store.getters['source/control/sourcesName']
    }
  },
  watch: {
    company(val) {
      this.form.company = val
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
      let source = this.form.source
      let hostname = ''
      try {
        // eslint-disable-next-line no-new
        new URL(source)
      } catch {
        source = 'https://' + source
      }
      hostname = parseUrl(source).hostname

      try {
        const formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('source', hostname)
        formData.append('company', this.form.company)
        formData.append('brand', this.form.brand)
        formData.append('published', this.form.published)
        this.$axios.setToken(false)
        const categories = await this.$axios.$get(`https://${hostname}/rest/?get=slist`)
        formData.append('categories', JSON.stringify(categories))

        if (this.form.image) {
          this.$axios.setHeader('Content-Type', 'multipart/form-data')
          formData.append('image', this.form.image.raw)
        }
        await this.$axios.$post('/api/v1/source-site/update/' + this.form._id, formData)
        this.$axios.setToken(this.$store.getters['auth/token'], 'Bearer')
        this.$store.dispatch('source/control/fetchItems')
        this.clearForm()
        this.$notify({
          message: 'Источник успушно обновлен!',
          customClass: 'success-notyfy'
        })
        this.onClose()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    onOpen() {
      const source = this.$store.getters['source/control/source']
      this.form._id = source._id
      this.form.name = source.name
      this.form.source = source.source
      this.form.company = source.company
      this.form.brand = source.brand
      this.form.published = source.published
      this.form.image = ''
      this.preview = source.image ? `/site/images/brand${source.image}` : ''
      this.loadContent = true
    },
    onClose() {
      this.$store.commit('source/control/SET_SOURCE', null)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateSource',
        status: false
      })
      this.loadContent = false
    },
    clearForm() {
      this.form.name = ''
      this.form.source = ''
      this.form.company = ''
      this.form.brand = ''
      this.form.published = true
      this.form.image = ''
    },
    handleImageChange(file) {
      console.log('handleImageChange', file)
    },
    /** Фильтрация брендов */
    querySearchBrand(queryString, cb) {
      const brands = this.brands
      const results = queryString
        ? brands.filter(this.createFilter(queryString))
        : brands
      cb(results)
    },
    createFilter(queryString) {
      return (btand) => {
        return (
          btand.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelectBrand(item) {
      this.form.brand = item.value
    }
  }
}
</script>
