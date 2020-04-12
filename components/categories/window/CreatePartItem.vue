<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerCreatePartItem"
    :with-header="false"
    :before-close="onClose"
    @opened="onOpen"
    title="Добавить деталь"
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
        <h3 class="mb-20">Добавить деталь</h3>
      </div>
      <!-- name -->
      <div class="col-6">
        <el-form-item prop="name" label="Наименование">
          <el-input v-model="form.name" placeholder="Наименование" />
        </el-form-item>
      </div>
      <!-- end name -->
      <!-- price -->
      <div class="col-6">
        <el-form-item prop="price" label="Цена">
          <el-input v-model="form.price" placeholder="Цена" />
        </el-form-item>
      </div>
      <!-- end price -->
      <div class="col-6">
        <!-- impuls -->
        <el-form-item prop="impuls" label="Цена ремонта impuls">
          <el-input v-model="form.impuls" placeholder="Цена ремонта impuls" />
        </el-form-item>
        <!-- end impuls -->
        <!-- rservice -->
        <el-form-item prop="rservice" label="Цена ремонта rservice">
          <el-input
            v-model="form.rservice"
            placeholder="Цена ремонта rservice"
          />
        </el-form-item>
        <!-- end rservice -->
      </div>
      <!-- description -->
      <div class="col-6">
        <el-form-item prop="description" label="Описание">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="Описание"
            maxlength="255"
            rows="6"
            show-word-limit
          />
        </el-form-item>
      </div>
      <!-- end description -->
      <!-- categories -->
      <div class="col-12">
        <div class="form-group mb-20">
          <treeselect
            v-model="categories"
            :multiple="true"
            :options="categoryData"
            :disable-branch-nodes="true"
            placeholder="Другие разделы"
          >
            <div slot="value-label" slot-scope="{ node }">
              {{ node.raw.brand }} - {{ node.raw.company }} =>
              {{ node.raw.label }}
            </div>
          </treeselect>
        </div>
      </div>
      <!-- categories -->
      <!-- exceptions -->
      <div v-if="form.excepts.length > 0" class="col-12">
        <label class="desc-sm">Исключение для:</label>
        <div
          v-for="(item, idx) in form.excepts"
          :key="idx"
          class="form-group row"
        >
          <!--  -->
          <div class="col-7 mb-10">
            <el-select
              v-model="form.excepts[idx].model"
              filterable
              placeholder="Модель"
              class="w100"
            >
              <el-option
                v-for="(el, _idx) in $store.getters['source/page/deviceList']"
                :key="_idx"
                :label="el.pagetitle"
                :value="el.pagetitle"
              />
            </el-select>
          </div>
          <div class="col-1 text-center prl-0">
            <el-button
              @click="removeNewExcept(idx)"
              title="Удалить исключение"
              icon="el-icon-delete"
              type="danger"
              style="padding:5px;width:40px;height:40px"
            />
          </div>
          <div class="col-4">
            <el-form-item>
              <el-input v-model="form.excepts[idx].price" placeholder="Цена" />
            </el-form-item>
          </div>
          <!--  -->
        </div>
      </div>
      <!-- end exceptions -->
      <div class="col-5">
        <el-button
          @click="addNewExcept"
          title="Добавить исключение"
          icon="el-icon-plus"
          type="primary"
          size="medium"
          style="padding:5px;width:40px;height:40px"
        />
      </div>
      <div class="col-7 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Создать
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: { Treeselect },
  data() {
    return {
      loading: false,
      form: {
        name: 'Test name',
        price: '500',
        brand: '',
        category: '',
        impuls: '',
        rservice: '',
        description: '',
        excepts: []
      },
      /**
       * {
       *   id: 'a', // id источника
       *   label: 'brand name', // название бренда
       *   company: 'rservice',
       *   children: [
       *     {
       *       id: 'aa',
       *       label: 'aa',
       *       company: 'rservice'
       *     },
       *     {
       *       id: 'ab',
       *       label: 'ab',
       *       company: 'rservice'
       *     }
       *   ]
       * },
       */
      categoryData: [],
      categories: [],
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
        price: [
          {
            required: true,
            message: 'Цена',
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
          this.chekForm()
        } else {
          return false
        }
      })
    },
    async chekForm() {
      this.loading = true
      try {
        this.form.brand = this.$store.state.source.page.params.brand.toLowerCase()
        this.form.category = this.$store.state.source.page.categoryName.toLowerCase()
        // создание текущей позиции
        await this.onCreate(this.form)

        // проходимся и заполняем уникальные категории + бренды
        for (const el of this.categories) {
          const params = el.split('_')
          const item = { ...this.form }
          delete item.excepts
          item.brand = params[0]
          item.category = params[1].replace('@', ' ')
          await this.onCreate(item)
        }

        // обновлять список деталей кактегории
        this.$store.dispatch('source/page/getParts')
        this.clearForm()
        this.onClose()
        await this.$notify({
          message: 'Деталь успушно добавлена!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        console.error('CreatePartItem - chekForm', e)
        this.$store.commit('SET_ERROR', 'В процессе работы возникли проблемы!')
      } finally {
        this.loading = false
      }
    },
    async onCreate(data) {
      try {
        await this.$axios.$post('/api/v1/part/check', data)
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },
    clearForm() {
      this.form.name = ''
      this.form.brands = ''
      this.form.category = ''
      this.form.price = ''
      this.form.impuls = ''
      this.form.description = ''
      this.form.rservice = ''
      this.form.excepts = []
      this.categoryData = []
      this.categories = []
    },
    async onOpen() {
      // загрузка категорий
      this.categoryData = []
      const tmpBrand = []
      // eslint-disable-next-line prettier/prettier
      await this.$store.getters['source/control/sources'].forEach(async (el) => {
          const children = []
          const brand = el.brand.toLowerCase()
          if (tmpBrand.includes(brand)) return
          tmpBrand.push(brand)
          for (const item of el.categories) {
            const itemId = item.pagetitle.replace(' ', '@').toLowerCase()
            await children.push({
              id: `${brand}_${itemId}`, // sony_настольные@пк
              label: item.pagetitle,
              company: el.company,
              brand: el.brand
            })
          }

          this.categoryData.push({
            id: brand,
            label: el.brand,
            company: el.company,
            children
          })
        }
      )
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreatePartItem',
        status: false
      })
    },
    /** Добавить исключение */
    addNewExcept(idx) {
      this.form.excepts.push({ model: '', price: '' })
    },
    /** Удалить исключение */
    removeNewExcept(idx) {
      this.form.excepts.splice(idx, 1)
    }
  }
}
</script>
