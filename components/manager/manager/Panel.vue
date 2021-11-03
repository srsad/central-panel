<template>
  <div class="row">
    <!-- v-if="$abilities('report-spb_33038_panel_plan_panel-create')" -->
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
            @click="onCreate"
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
      <app-list
        :list="list"
        :loading="loading"
        :branch="branchId"
        @remove="onRemove"
        @loading="onStatus"
      />
    </div>
  </div>
</template>

<script>
import AppList from '~/components/manager/manager/List'

export default {
  components: {
    AppList
  },
  props: {
    branch: {
      type: String,
      default: '33038'
    }
  },
  data() {
    return {
      loading: false,
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
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ]
      },
      list: [],
      branchId: ''
    }
  },
  async mounted() {
    await this.getBranchId()
    this.fetchItems()
  },
  methods: {
    /**
     * Создание нового блана
     */
    async onCreate() {
      try {
        const form = { ...this.form, branch: this.branchId }
        await this.$axios.post('/api/v1/report/manager-plan/create', form)
        this.fetchItems()
        this.clearForm()
        this.$notify({
          message: 'План успешно создании!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit(
          'SET_ERROR',
          'Ошибка при создании плана для менеджеров и инженеров'
        )
        console.error(
          'Ошибка при создании плана для менеджеров и инженеров',
          e.response.data.message
        )
      }
    },

    /**
     * Удаление плана
     */
    async onRemove(branchId) {
      try {
        await this.$axios.$delete(
          '/api/v1/report/manager-plan/remove/' + branchId
        )
        this.fetchItems()
        this.$notify({
          message: 'План успешно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit(
          'SET_ERROR',
          'Ошибка при удалении плана для менеджеров и инженеров'
        )
        console.error(
          'Ошибка при удалении плана для менеджеров и инженеров',
          e.response.data.message
        )
      }
    },

    /**
     * Загрузка данных
     */
    async fetchItems() {
      try {
        const res = await this.$axios.$get(
          '/api/v1/report/manager-plan/get-branch/' + this.branchId
        )
        this.list = res
      } catch (e) {
        await console.error(
          'Ошибка при получении менеджерского плана',
          e.response
        )
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },

    /**
     * Получить _id филиала
     */
    async getBranchId() {
      if (this.$store.getters['report/branch/branches'].length === 0) {
        await this.$store.dispatch('report/branch/fetchItems')
      }
      const branch = this.$store.getters['report/branch/branches'].find(
        (el) => el.branch_id === this.branch
      )
      this.branchId = branch._id
    },

    /**
     * Отчищение формы после создания
     */
    clearForm() {
      this.form.name = ''
    },

    /**
     * Статус загрузки
     */
    onStatus(status) {
      this.loading = status
    }
  }
}
</script>
