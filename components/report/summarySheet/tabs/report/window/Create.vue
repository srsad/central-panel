<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerReportSummarySheetCreate"
    :before-close="onClose"
    title="Создать отчет"
    width="500px"
    center
  >
    <!--  -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      label-position="top"
    >
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
      <div class="mb-20">
        <el-form-item prop="branch_id" label="Филиал">
          <el-select v-model="form.branch_id" class="w100">
            <el-option
              v-for="(item, idx) in $store.getters['report/branch/branches']"
              :key="idx"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
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
      <div>
        <el-form-item>
          <label class="w100">
            <span
              class="el-button el-button--primary is-plain el-button--sm w100"
            >
              <i class="el-icon-download"></i>
              Загрузить бренды из Excel
            </span>
            <input
              @change="uploadFromExcel"
              :disabled="loading"
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              style="display:none"
            />
          </label>
        </el-form-item>
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
import XLSX from 'xlsx'

export default {
  data() {
    return {
      loading: false,
      allBrands: false,
      excelList: [],
      form: {
        name: 'Отчет за - ' + moment().format('MM/YYYY'),
        brands_id: [],
        branch_id: '',
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
        branch_id: [
          {
            required: true,
            message: 'Выберите филиал',
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
    /**
     * Загрузить бренды и начальные данные из excel
     */
    uploadFromExcel(e) {
      this.loading = true
      try {
        const files = e.target.files
        const file = files[0]

        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString

        reader.onload = (e) => {
          let data = e.target.result
          if (!rABS) data = new Uint8Array(data)
          const wb = XLSX.read(data, { type: rABS ? 'binary' : 'array' })

          let result = {}
          wb.SheetNames.forEach((sheetName) => {
            const roa = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
              header: 1
            })
            if (roa.length) result = roa
          })
          result.shift() // удаляем первую строку
          this.excelList = result // устанавливаем получившийся результат
          this.excelParse() // разбираем excel
        }

        if (rABS) {
          reader.readAsBinaryString(file)
        } else {
          reader.readAsArrayBuffer(file)
        }
      } catch (e) {
        console.error('Ошибка при попытке загрузки ексель файла.', e)
      } finally {
        this.loading = false
        e.path[0].value = '' // отчищаем input file для повторной загрузки файла
      }
    },
    /**
     * Парсим exel и бренды
     */
    async excelParse() {
      this.loading = true
      for await (const row of this.excelList) {
        let brand = row[33].split(',')
        brand = brand[0].trim()

        // eslint-disable-next-line
        let brandId = this.brandList.find((el) => el.name.toLowerCase() === brand.toLowerCase())

        // если бренд не найден, то создаем и созвращаем его id
        if (typeof brandId === 'undefined') {
          await this.createBrand(brand)
          // eslint-disable-next-line
          brandId = this.brandList.find((el) => el.name.toLowerCase() === brand.toLowerCase())
        }

        if (!this.form.brands_id.includes(brandId._id)) {
          this.form.brands_id.push(brandId._id)
        }
      }
      this.loading = false
    },
    /**
     * Создание новго бренда
     */
    async createBrand(brandName) {
      try {
        await this.$axios.$post('/api/v1/report/brand/create', {
          name: brandName
        })
        await this.$store.dispatch('report/brand/fetchItems')
      } catch (e) {
        console.error(
          'Проблема при импотре бредна из эксель!',
          e.response.data.message
        )
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
