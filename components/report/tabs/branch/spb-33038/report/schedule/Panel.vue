<template>
  <div class="row">
    <div class="col-12">
      <el-form
        ref="form"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="Наименование графика"
            size="mini"
            style="width: 250px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="addNewSchedule"
            :loading="loading"
            size="mini"
            type="success"
            icon="el-icon-plus"
            title="Добавить график"
          >
            Добавить график
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="col-12">
      <app-list :items="items" />
    </div>
  </div>
</template>

<script>
import AppList from '~/components/report/tabs/branch/spb-33038/report/schedule/List'

export default {
  components: {
    AppList
  },
  data() {
    return {
      loading: false,
      branch: '33038',
      form: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите название',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
            trigger: 'blur'
          },
          {
            max: 64,
            message: 'Максимум 64 символа',
            trigger: 'blur'
          }
        ]
      },
      // список графиков
      items: []
    }
  },
  computed: {
    brandId() {
      const branches = this.$store.getters['report/branch/branches']
      const branch = branches.find((el) => el.branch_id === this.branch)
      return branch._id || ''
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    /**
     * Валидация при создании новгого графика
     */
    addNewSchedule() {
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

        await this.$axios.$post('/api/v1/report/schedule/create', formData)
        this.fetchItems()
        this.$notify({
          message: 'График успешно создан!',
          customClass: 'success-notyfy'
        })
        this.clearForm()
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
    },

    /**
     * Удалить график
     */
    removeSchedule(id) {
      console.log('removeSchedule')
    },

    /**
     * Вывод графиков данного бренда
     */
    async fetchItems() {
      this.loading = true
      try {
        const res = await this.$axios.$get(
          'api/v1/report/schedule/get-by-brand/' + this.brandId
        )
        this.items = res
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
