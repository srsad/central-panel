<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowUpdateCategory"
    :before-close="onClose"
    @open="onOpen"
    width="30%"
    title="Обновить категорию"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
    >
      <div class="col-12">
        <el-form-item prop="name" label="Наименование категории">
          <el-input
            v-model="formData.name"
            size="mini"
            placeholder="Наименование категории"
          />
        </el-form-item>
      </div>
      <div class="col-12">
        <el-form-item prop="malfunctions_id" label="Коллекция неисправностей">
          <el-select
            v-model="formData.malfunctions_id"
            size="mini"
            placeholder="Коллекция неисправностей"
            class="w100"
            filterable
          >
            <el-option
              v-for="malfunction in malfunctions"
              :key="malfunction._id"
              :label="malfunction.name"
              :value="malfunction._id"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Обновить
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateCategory',

  data() {
    return {
      loading: false,
      formData: {
        name: '',
        malfunctions_id: ''
      },
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
        malfunctions_id: [
          {
            required: true,
            message: 'Выберите коллекцию неисправностей',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    malfunctions() {
      return this.$store.state.repair.malfunction.malfunctions
    }
  },

  mounted() {
    const form = this.$store.state.repair.category.category
    this.form = JSON.parse(JSON.stringify(form))

    if (!this.$store.state.repair.malfunction.malfunctions.length) {
      this.$store.dispatch('repair/malfunction/fetchItems')
    }
  },

  methods: {
    /**
     * Закрытие окна
     */
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowUpdateCategory',
        status: false
      })
      this.clearForm()
    },

    onOpen() {
      const category = this.$store.state.repair.category.category
      this.formData = JSON.parse(JSON.stringify(category))
    },

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
      try {
        const brandId = this.$store.state.repair.brand.brand?._id
        await this.$axios.$put(
          '/api/v1/repair/category/update/' + this.formData._id,
          this.formData
        )
        this.$store.dispatch('repair/category/fetchItemsById', brandId)
        this.clearForm()
        this.onClose()
        await this.$notify({
          message: 'Категория успушно обнавлена!',
          customClass: 'success-notyfy'
        })
      } catch (error) {
        console.error('Не удалось обновить категорию', error.response)
        this.$store.commit('SET_ERROR', error.response.data.message)
      } finally {
        this.loading = false
      }
    },

    clearForm() {
      this.formData = {
        name: '',
        malfunctions_id: ''
      }
    }
  }
}
</script>
