<template>
  <div>
    <div v-for="(item, idx) of list" :key="idx">
      <!-- v-if="$abilities('part-remove')" -->
      <el-popconfirm
        @onConfirm="() => $emit('remove', item._id)"
        title="Удалить деталь?"
        confirm-button-text="Да"
        confirm-button-type="success"
        cancel-button-type="default"
        cancel-button-text="Нет, спасибо"
      >
        <el-button
          slot="reference"
          :loading="loading"
          size="mini"
          type="danger"
          title="Удалить"
          icon="el-icon-delete"
          style="padding: 7px 8px"
        />
      </el-popconfirm>
      <!--  -->
      <div>
        <label>
          <span class="el-button el-button--primary is-plain el-button--sm">
            <i class="el-icon-download"></i>
            Загрузить бренды и филиалы из Excel
          </span>
          <input
            @change="uploadFromExcel"
            :disabled="loading"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style="display:none"
          />
        </label>
      </div>
      <!--  -->
      <hr />
      {{ item }}
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    branch: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      excelList: []
    }
  },
  methods: {
    /**
     * Загрузить бренды и начальные данные из excel
     */
    uploadFromExcel(e) {
      this.$emit('loading', true)
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
          this.excelList = []
          this.excelList = result // устанавливаем получившийся результат
          this.stafParser() // списка персонала менеджеры/инженеры
        }

        if (rABS) {
          reader.readAsBinaryString(file)
        } else {
          reader.readAsArrayBuffer(file)
        }
      } catch (e) {
        console.error('Ошибка при попытке загрузки ексель файла.', e)
      } finally {
        this.$emit('loading', false)
        e.path[0].value = '' // отчищаем input file для повторной загрузки файла
      }
    },

    /**
     * Получение списка персонала менеджеры/инженеры
     */
    stafParser() {
      const branch = this.$store.getters['report/branch/branches'].find(
        (el) => el._id === this.branch
      )
      // инекс для менеджеров
      const managerIdx = this.excelList[0].indexOf('Менеджер')
      // инекс для инженеров
      const engineerIdx = this.excelList[0].indexOf('Инженер')
      // инекс для локации
      const locationIdx = this.excelList[0].indexOf('Текущая локация')
      this.excelList.splice(0, 1)

      // const managerMap = new Map() // список для менеджеров
      // const engineerMap = new Map() // список для инженеро

      // for (const item of this.excelList) {
      //   console.log(
      //     '---',
      //     item[locationIdx],
      //     branch.name,
      //     item[locationIdx] === branch.name
      //   )
      //   // адрес находится в name =(
      //   if (item[locationIdx] === branch.name) {
      //     console.log(item)
      //   }
      // }

      // -
      console.log('managerIdx', managerIdx, engineerIdx, locationIdx)
      console.log('branch', branch)
      console.log('excelList', this.excelList)
    }
  }
}
</script>
