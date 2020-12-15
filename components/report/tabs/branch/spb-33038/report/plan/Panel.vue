<template>
  <div class="row">
    <div class="col-12">
      <el-form
        ref="form"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
        format="MM/yyyy"
      >
        <el-form-item prop="plan_date">
          <el-date-picker
            v-model="form.plan_date"
            type="month"
            size="mini"
            format="MMMM yyyy"
            value-format="timestamp"
            placeholder="Выберите месяц"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="addNewPlan"
            :loading="loading"
            size="mini"
            type="success"
            icon="el-icon-plus"
            title="Создать план"
          >
            Создать план
          </el-button>
        </el-form-item>
      </el-form>
      <el-button @click="fetchItems">
        sdfsdf
      </el-button>
    </div>
    <!-- список -->
    <app-list
      v-for="(item, idx) of items"
      :key="idx"
      :item="item"
      :idx="idx"
      @remove="onRemove"
    />
  </div>
</template>

<script>
import AppList from '~/components/report/tabs/branch/spb-33038/report/plan/List'
import moment from 'moment'
moment.locale('ru')

export default {
  components: {
    AppList
  },
  data() {
    return {
      loading: false,
      branch: '33038',
      form: {
        name: '',
        plan_date: ''
      },
      rules: {
        plan_date: [
          {
            required: true,
            message: 'Введите название',
            trigger: 'blur'
          }
        ]
      },
      // список планов
      items: [],
      // параметры построчной навигации
      offset: 0,
      limit: 10,
      total: 100 // до первой загрузки
    }
  },
  computed: {
    brandId() {
      const branches = this.$store.getters['report/branch/branches']
      const branch = branches.find((el) => el.branch_id === this.branch)
      return branch._id || ''
    },
    params() {
      return {
        offset: this.offset,
        limit: this.limit,
        total: this.total,
        branch: this.brandId
      }
    }
  },
  methods: {
    /**
     * Валидация при создании новгого плана
     */
    addNewPlan() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onCreate()
        } else {
          return false
        }
      })
    },

    /**
     * Создание новгого графика
     */
    async onCreate() {
      this.loading = true
      try {
        const formData = this.form
        formData.branch = this.brandId
        const name = moment(formData.plan_date).format('MMMM YYYY')
        formData.name = name.charAt(0).toUpperCase() + name.substr(1)

        await this.$axios.$post('/api/v1/report/plan/create', formData)
        this.$notify({
          message: 'План успешно создан!',
          customClass: 'success-notyfy'
        })
        this.clearForm()
        this.fetchItems()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * Отчищение формы после создания
     */
    clearForm() {
      this.form.name = ''
      this.form.plan_date = ''
    },

    /**
     * Удалить план
     */
    removePlan(id) {
      console.log('removePlan')
    },

    /**
     * Обновить план
     */
    updatePlan(id) {
      console.log('updatePlan')
    },

    /**
     * Загрузить еще план
     */
    async fetchItems() {
      try {
        const res = await this.$axios.$get('/api/v1/report/plan/get-list/', {
          params: this.params
        })
        this.items = res
        console.log('res', res)
        console.log('fetchItems')
      } catch (e) {
        console.error('Ошибка при получении списка планов', e.response)
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },

    /**
     * Удалить план
     */
    async onRemove(data) {
      console.log('data', data)
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/report/plan/remove/' + data._id)
        this.$notify({
          message: 'План успушно удаленн!',
          customClass: 'success-notyfy'
        })
        this.fetchItems()
      } catch (e) {
        console.error('Не удалось удалить план', e)
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
