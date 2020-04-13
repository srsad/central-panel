<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerUpdatePartItem"
    :with-header="false"
    :before-close="onClose"
    @opened="onOpen"
    title="Обновить деталь"
    custom-class="drawer"
  >
    <div
      v-loading="true"
      v-if="!lodContent"
      class="mt-100"
      element-loading-text="Загрузка..."
      element-loading-spinner="el-icon-loading"
    />
    <el-form
      ref="form"
      v-else
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
              @change="changeException"
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
        <el-dropdown
          @click="validateForm('onSaveOne')"
          @command="validateForm('onSaveMany')"
          split-button
          placement="top-end"
          trigger="click"
          type="success"
        >
          Сохранить
          <el-dropdown-menu slot="dropdown" trigger="click">
            <el-dropdown-item command="updateMany" icon="fa fa-floppy-o">
              Сохранить все зависимости
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      lodContent: false,
      loading: false,
      form: {
        name: '',
        price: '',
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
      categoryData: [], // все категории
      categories: [], // активные категории
      categoriesId: new Map(), // активные категории с их id, brand_category => _id
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
    validateForm(checkMethods) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this[checkMethods]()
        } else {
          return false
        }
      })
    },
    /** Сохранить изменения только у выбранной позиции */
    async onSaveOne() {
      await this.onUpdate(this.form)
      // обновляем список деталей кактегорий
      this.$store.dispatch('source/page/getParts')
      this.onClose()
      await this.$notify({
        message: 'Данные успешно обновлены!',
        customClass: 'success-notyfy'
      })
    },
    /** Сохранить изменения у выбранной позиции и у всех зависимых */
    async onSaveMany() {
      // создание текущей позиции
      await this.onUpdate(this.form)
      // проходимся и заполняем уникальные категории + бренды
      for (const el of this.categories) {
        const params = el.split('_')
        const item = { ...this.form }
        delete item.excepts
        item.brand = params[0]
        item.category = params[1].replace('@', ' ')
        item._id = this.categoriesId.get(el)
        await this.onUpdate(item)
      }
      // обновляем список деталей кактегорий
      this.$store.dispatch('source/page/getParts')
      this.onClose()
      await this.$notify({
        message: 'Данные успешно обновлены!',
        customClass: 'success-notyfy'
      })
    },
    async onUpdate(data) {
      this.loading = true
      try {
        await this.$axios.$post('/api/v1/part/check', data)
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
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
      this.lodContent = false
    },
    onClose() {
      this.clearForm()
      this.$store.dispatch('source/page/setPart', null)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdatePartItem',
        status: false
      })
    },
    async onOpen() {
      // загрузка всех категорий
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

      // данные детали
      // eslint-disable-next-line prettier/prettier
      this.form = await JSON.parse(JSON.stringify(this.$store.state.source.page.partItem))

      // загрузка и установка активных категорий
      try {
        const parts = await this.$axios.$get('/api/v1/part/getAll', {
          params: {
            name: this.form.name
          }
        })
        parts.data.forEach((el) => {
          const category = el.category.replace(' ', '@').toLowerCase()
          this.categories.push(`${el.brand}_${category}`)
          this.categoriesId.set(`${el.brand}_${category}`, el._id)
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
      this.lodContent = true
    },
    /** Проверка выбранного исключения на дубль */
    changeException(device) {
      const items = this.form.excepts.filter((el) => el.model === device)
      if (items.length > 1) {
        this.$store.commit(
          'SET_ERROR',
          'Это устройство уже есть в списке исключений!'
        )
      }
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
