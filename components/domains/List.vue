<template>
  <el-table
    :data="items"
    @row-dblclick="edit"
    :row-style="tableRowStyle"
    empty-text="Нет данных"
    class="w100"
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
    <el-table-column prop="sitestatus" label="" width="30" />
    <!-- <el-table-column label="Доступ" width="80">
      <template slot-scope="scope">
        <div>{{ scope.row.status }}</div>
      </template>
    </el-table-column> -->
    <el-table-column prop="brand" label="Бренд" width="100" />
    <el-table-column
      :filters="[
        { value: 'spb', text: 'Санкт-Петербург' },
        { value: 'msk', text: 'Москва' },
        { value: 'krd', text: 'Краснодар' }
      ]"
      :filter-method="filterHandler"
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
      cities: [
        { value: 'spb', label: 'Санкт-Петербург' },
        { value: 'msk', label: 'Москва' },
        { value: 'krd', label: 'Краснодар' }
      ]
    }
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
      await console.log('switchStatus', item)
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
    /** Подцветка строк и проверка на опубликовонность */
    tableRowStyle({ row, rowIndex }) {
      const style = { background: row.color + '3f' }
      if (!row.status) style.opacity = '0.7'
      return style
    },
    /** Возврощает название города */
    getCity(city) {
      return this.cities.find((el) => el.value === city).label
    },
    /** Фильтр по городам */
    filterHandler(value, row) {
      return row.city === value
    }
  }
}
</script>
