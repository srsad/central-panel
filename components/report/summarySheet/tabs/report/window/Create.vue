<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerReportSummarySheetCreate"
    :before-close="onClose"
    title="Создать отчет"
    width="400px"
    center
  >
    <!--  -->
    <el-form ref="form" :model="form" :rules="rules" :disabled="loading">
      <div class="mb-20">
        <el-form-item prop="name" label="Наименование">
          <el-input v-model="form.name" />
        </el-form-item>
      </div>
      <div class="mb-20">
        <el-form-item prop="period" label="Период">
          <el-date-picker
            v-model="form.period"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="От"
            end-placeholder="До"
          />
        </el-form-item>
      </div>
      <div class="mb-25">
        <el-form-item prop="brands_id" class="mb-20" label="Бренды">
          <el-select
            v-model="form.brands_id"
            class="w100"
            multiple
            filterable
            placeholder="Бренды"
          >
            <el-option
              v-for="item in brandList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-checkbox v-model="allBrands">Выбрать все бренды</el-checkbox>
      </div>
      <div class="text-right">
        <el-button @click="onClose">Отмена</el-button>
        <el-button @click="validateForm" type="success">
          Создать
        </el-button>
      </div>
    </el-form>
    <!--  -->
  </el-dialog>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      loading: false,
      allBrands: false,
      form: {
        name: 'Отчет за - ' + moment().format('MM/YYYY'),
        brands_id: [],
        period: []
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Ввеедите название отчета',
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
        brands_id: [
          {
            required: true,
            message: 'Выберите хотя бы один бренд',
            trigger: 'blur'
          }
        ],
        period: [
          {
            required: true,
            message: 'Выберите период',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    brandList() {
      return JSON.parse(
        JSON.stringify(this.$store.getters['report/brand/brands'])
      )
    }
  },
  watch: {
    allBrands(val) {
      if (val === true) {
        this.form.brands_id = this.brandList.map((el) => el._id)
      }
    },
    'form.brands_id'(val) {
      this.allBrands = val.length === this.brandList.length
      // this.form.brands_id
      // console.log('val', val)
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
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    async onCreate() {
      try {
        const fd = JSON.parse(JSON.stringify(this.form))
        fd.period = fd.period.join(' ')
        await this.$axios.$post('/api/v1/report/summory/create', fd)
        this.$notify({
          message: 'Создание отчета началось!',
          customClass: 'success-notyfy'
        })
        this.onClose()
        this.clearForm()
        await this.$store.dispatch('report/summary/fetchItems')
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message, { root: true })
      }
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportSummarySheetCreate',
        status: false
      })
    },
    clearForm() {
      this.form.name = 'Отчет за - ' + moment().format('MM/YYYY')
      this.form.brands_id = []
      this.form.period = []
    }
  }
}
</script>
