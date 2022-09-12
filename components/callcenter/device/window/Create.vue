<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerAddDevice"
    :before-close="onClose"
    :title="title"
    width="30%"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row"
    >
      <div class="col-12">
        <!-- name -->
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Наименование" />
        </el-form-item>
        <!-- end name -->
        <!-- series -->
        <el-form-item prop="series">
          <el-select
            v-model="form.series"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Серия"
            class="w100"
          >
            <el-option
              v-for="item in seriesList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- end series -->
      </div>
      <!-- end content -->
      <div class="col-12 text-right mt-15">
        <el-button
          @click.prevent="validateForm"
          type="success"
          icon="el-icon-plus"
        >
          Добавить
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        series: []
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите запись',
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
        // series: [
        //   {
        //     required: true,
        //     message: 'Выберите серию',
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },

  computed: {
    title() {
      return this.form.name ? this.form.name : 'Добавить устроиство'
    },

    seriesList() {
      const devices = this.$store.state.repair.device.devices
      const result = []
      for (const device of devices) {
        if (device.series?.trim() && !result.includes(device.series)) {
          result.push(device.series)
        }
      }
      return result
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
        const categoryId = this.$store.state.repair.category.selectCategory._id
        const deviceSeries = this.form.series[0] ?? ''
        const deviceName = deviceSeries
          ? this.form.name + ' ' + deviceSeries
          : this.form.name
        const result = await this.$store.dispatch('repair/device/create', {
          name: deviceName,
          series: deviceSeries,
          category_id: categoryId
        })

        this.$store.dispatch('repair/device/localAdd', result)

        this.clearForm()
        this.onClose()

        this.$notify({
          message: 'Устройство успешно добавленно!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', 'Что-то пошло не так!')
      } finally {
        this.loading = false
      }
    },

    clearForm() {
      this.form.name = ''
      this.form.series = ''
      this.series = []
    },

    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerAddDevice',
        status: false
      })
      this.clearForm()
    }
  }
}
</script>

<style lang="sass">
#fileUploader
  display: none
[for="fileUploader"]
  display: block
  margin: 0 auto
  text-align: center
  & i
    font-size: 72px
    cursor: pointer
.img-container
  .el-button--danger
    top: 0
    right: 5px
    position: absolute
</style>
