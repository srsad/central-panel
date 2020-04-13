<template>
  <el-table
    :data="items"
    @row-dblclick="edit"
    :row-style="tableRowStyle"
    empty-text="Нет данных"
  >
    <el-table-column label="" width="10">
      <template slot-scope="scope">
        <div
          :style="
            `position:absolute;top:0;left:0;width:100%;height:100%;background:${scope.row.color};`
          "
        />
      </template>
    </el-table-column>
    <el-table-column prop="sitestatus" label="" width="10" />
    <el-table-column
      :filters="brands_"
      :filter-method="filterHandlerBrands"
      prop="brand"
      label="Бренд"
      width="150"
    />
    <el-table-column
      :filters="cities_"
      :filter-method="filterHandlerCities"
      label="Город"
      width="200"
    >
      <template slot-scope="scope">
        <el-tag type="primary" disable-transitions>
          {{ getCity(scope.row.city) }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Домен">
      <template slot-scope="scope">
        <a :href="`https://${scope.row.domain}`" target="_blank">
          {{ scope.row.domain }}
        </a>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Наименование" />
    <el-table-column prop="vendor" label="Исполнитель" />
    <el-table-column label="Действия" label-class-name="text-center">
      <template slot-scope="scope">
        <div class="text-center">
          <el-button-group>
            <el-button
              @click="edit(scope.row)"
              :loading="loading"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              title="Редактировать"
            />
            <el-button
              @click="switchStatus(scope.row)"
              :loading="loading"
              :icon="`${scope.row.status ? 'el-icon-check' : 'el-icon-close'}`"
              :title="
                `${
                  scope.row.status ? 'Сделать не активным' : 'Сделать активным'
                }`
              "
              type="info"
              size="mini"
            />
            <el-popconfirm
              @onConfirm="remove(scope.$index, scope.row)"
              title="Удалить домен?"
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
                icon="el-icon-delete"
              />
            </el-popconfirm>
          </el-button-group>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      cities_: [], // список городов для фильтра в таблице
      cities: [], // список для фильтрации городов
      brands_: [], // список брендов для фильтра в таблице
      brands: [] // список для фильтрации брендов
    }
  },
  mounted() {
    this.getCities()
  },
  methods: {
    async remove(idx, item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/domain/remove/' + item._id)
        this.$store.dispatch('domains/fetchDomains')
        this.$notify({
          message: 'Домемн успушно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        throw e
      } finally {
        this.loading = false
      }
    },
    edit(item) {
      if (this.loading === true) return
      this.$store.commit('domains/SET_DOMAIN', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateDomains',
        status: true
      })
    },
    /** Смена статуса */
    async switchStatus(item) {
      this.loading = true
      try {
        const formData = JSON.parse(JSON.stringify(item))
        formData.status = !formData.status
        await this.$store.dispatch('domains/updateDomain', formData)
        this.$store.dispatch('domains/fetchDomains')
        this.$notify({
          message: 'Данные обновлены!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        throw e
      } finally {
        this.loading = false
      }
    },
    /** Подцветка строк и проверка на активность */
    tableRowStyle({ row, rowIndex }) {
      const style = { background: row.color + '3f' }
      if (!row.status) style.opacity = '0.6'
      return style
    },
    /** Загрузка списка городов */
    async getCities() {
      await this.$store.dispatch('city/fetchItems')
      this.cities = await this.$store.getters['city/сityes'].map((el) => {
        return { value: el._id, label: el.name }
      })
      this.cities_ = await this.$store.getters['city/сityes'].map((el) => {
        return { value: el._id, text: el.name }
      })
    },
    /** Возврощает название города */
    getCity(city) {
      try {
        if (this.cities_.length === 0 || this.cities.length === 0) return ''
        return this.cities.find((el) => el.value === city).label
      } catch (error) {
        console.error(`Не удалось получить данные города "${city}"`, error)
        return 'ГОРОД НЕ НАЙДЕН'
      }
    },
    /** Фильтр по городам */
    filterHandlerCities(value, row) {
      return row.city === value
    },
    /** Получаем уникальный список брендов */
    getAllBrends(brand) {
      if (this.brands_.length === 0 || this.brands.length === 0) return ''
      return this.brands.find((el) => el.value === brand).label
    },
    /** Фильтр по брендам */
    filterHandlerBrands(value, row) {
      return row.brand === value
    }
  }
}
</script>
