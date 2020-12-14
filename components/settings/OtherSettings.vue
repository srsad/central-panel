<template>
  <div class="row">
    <div class="col-md-3">
      <div class="form-group">
        <el-button
          @click="onUpdateCategoryList"
          :loading="loading"
          size="small"
          type="success"
          icon="el-icon-s-order"
        >
          Обновить список категорий
        </el-button>
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group">
        <el-button
          v-if="$abilities('export_exceptions')"
          @click="getExceptions"
          :loading="loading"
          size="small"
          type="primary"
          icon="fa fa-file-excel-o"
        >
          Выгрузить список исключений
        </el-button>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onUpdateCategoryList() {
      this.loading = true
      // проверяем сипсок источников из стора
      if (this.$store.getters['source/control/sources'].length === 0) {
        await this.$store.dispatch('source/control/fetchItems')
      }
      const sources = this.$store.getters['source/control/sources']
      this.$axios.setToken(false)
      // проходимся по каждому источнику, достаем его категории и обновляем туществующие
      for (const el of sources) {
        const categories = await this.$axios.$get(`https://${el.source}/rest/?get=slist`)
        const formData = new FormData()
        formData.append('categories', JSON.stringify(categories))
        await this.$axios.$post('/api/v1/source-site/update/' + el._id, formData)
      }
      this.$axios.setToken(this.$store.getters['auth/token'], 'Bearer')
      await this.$store.dispatch('source/control/fetchItems')
      this.$notify({
        message: 'Список категорий успушно обновлен!',
        customClass: 'success-notyfy'
      })
      this.loading = false
    },

    /**
     * Возвращает список исключений в excel
     */
    async getExceptions() {
      this.loading = true
      try {
        const { data } = await this.$axios.$get('/api/v1/exceptions/getAll')

        const wb = XLSX.utils.book_new()
        wb.SheetNames.push('Исключения')
        const ws = XLSX.utils.aoa_to_sheet(data)
        wb.Sheets['Исключения'] = ws

        const file = await XLSX.write(wb, {bookType:'xlsx',  type: 'binary'})

        const buf = new ArrayBuffer(file.length)
        const view = new Uint8Array(buf)
        for (let i = 0; i < file.length; i++) {
          view[i] = file.charCodeAt(i) & 0xFF
        }

        const blob = new Blob([buf],{ type: 'application/octet-stream' })
        saveAs(blob, 'Список исключений.xlsx')

      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
