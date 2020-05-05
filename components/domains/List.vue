<template>
  <div>
    <div>
      <el-table
        :data="items"
        @row-dblclick="edit"
        :row-style="tableRowStyle"
        :style="`max-width:${tableWidth}px;height:${tableHeight}px`"
        height="500"
        size="mini"
        empty-text="Нет данных"
      >
        <el-table-column label="" width="10" fixed="left">
          <template slot-scope="scope">
            <div
              :style="
                `position:absolute;top:0;left:0;width:100%;height:100%;background:${scope.row.color};`
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="П" width="25" fixed="left">
          <template slot-scope="scope">
            <div :style="setColor(scope.row.color)" class="ws-normal">
              {{ scope.row.priority }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="sitestatus" label="" width="1" fixed="left" /> -->
        <el-table-column
          :filters="brands_"
          :filter-method="filterHandlerBrands"
          prop="brand"
          label="Бренд"
          width="150"
          fixed="left"
        >
          <template slot-scope="scope">
            <div
              :title="scope.row.brand"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.brand }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Изг" width="40">
          <template slot-scope="scope">
            <div
              :title="scope.row.vendor"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.vendor }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :filters="cities_"
          :filter-method="filterHandlerCities"
          label="Город"
          width="180"
        >
          <template slot-scope="scope">
            <el-tag type="primary" disable-transitions>
              {{ getCity(scope.row.city) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Домен" width="250">
          <template slot-scope="scope">
            <a
              :href="`https://${scope.row.domain}`"
              :title="scope.row.domain"
              target="_blank"
              class="ws-normal"
            >
              {{ scope.row.domain }}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Наименование" width="180">
          <template slot-scope="scope">
            <div :title="scope.row.name" class="ws-normal">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="vendor" label="Исполнитель" width="180" /> -->
        <el-table-column label="Заглушка" width="100">
          <template slot-scope="scope">
            <div
              :title="scope.row.phone_default"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.phone_default | filterPhone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Визитка" width="100">
          <template slot-scope="scope">
            <div
              :title="scope.row.phone"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.phone | filterPhone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Метрика" width="80">
          <template slot-scope="scope">
            <div
              :title="scope.row.yametrika.id"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.yametrika.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Analytics" width="110">
          <template slot-scope="scope">
            <div
              :title="scope.row.analytics.id"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.analytics.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Alloka">
          <template slot-scope="scope">
            <div
              :title="scope.row.alloka.id"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.alloka.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="envybox.id" label="Envybox" width="110">
          <template slot-scope="scope">
            <div
              :title="scope.row.envybox.id"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              {{ scope.row.envybox.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="accaunts" label="Аккаунты" width="150">
          <template slot-scope="scope">
            <div
              v-if="scope.row.accaunts.login"
              :title="scope.row.accaunts.login"
              :style="setColor(scope.row.color)"
              class="ws-normal"
            >
              <el-button
                v-if="$abilities('domains-create')"
                @click="copyToBuffer(scope.row.accaunts)"
                icon="el-icon-document-copy"
                title="Копировать в буфер обмена"
                style="padding:0px"
                size="mini"
              />
              <span>{{ scope.row.accaunts.login }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="$abilities('domains-update') || $abilities('domains-remove')"
          label="Действия"
          label-class-name="text-center"
          fixed="right"
          width="200"
        >
          <template slot-scope="scope">
            <div class="text-center">
              <el-button-group>
                <el-button
                  v-if="$abilities('domains-update')"
                  @click="edit(scope.row)"
                  :loading="loading"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  title="Редактировать"
                />
                <el-button
                  v-if="$abilities('domains-update')"
                  @click="switchStatus(scope.row)"
                  :loading="loading"
                  :icon="
                    `${scope.row.status ? 'el-icon-check' : 'el-icon-close'}`
                  "
                  :title="
                    // eslint-disable-next-line prettier/prettier
                `${scope.row.status ? 'Сделать не активным' : 'Сделать активным'}`
                  "
                  type="info"
                  size="mini"
                />
                <el-popconfirm
                  v-if="$abilities('domains-remove')"
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
    </div>
  </div>
</template>

<script>
import { writeText } from 'clipboard-polyfill'

export default {
  filters: {
    filterPhone(str) {
      const phone = str.match(/\d*(-|)\d*(-)\d*/)
      return phone ? phone[0] : str
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      tableHeight: 700, // высота блока по умолчанию
      tableWidth: 1400, // ширина таблицы по умолчанию
      cities_: [], // список городов для фильтра в таблице
      cities: [], // список для фильтрации городов
      brands_: [], // список брендов для фильтра в таблице
      brands: [] // список для фильтрации брендов
    }
  },
  mounted() {
    this.getFilterItems() // подготовка данных для фильтрации
    setTimeout(() => {
      this.tableHeight = window.innerHeight - 210
      this.tableWidth = window.innerWidth - 300
    }, 100)
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
      if (!this.$abilities('domains-update')) return
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
      const style = {}
      // const style = { background: row.color }
      if (!row.status) style.opacity = '0.6'
      return style
    },
    /** Загрузка данных для фильтрации */
    async getFilterItems() {
      // Загрузка списка городов
      await this.$store.dispatch('city/fetchItems')
      this.cities = await this.$store.getters['city/сityes'].map((el) => {
        return { value: el._id, label: el.name }
      })
      this.cities_ = await this.$store.getters['city/сityes'].map((el) => {
        return { value: el._id, text: el.name }
      })
      // загрузка списка брендов
      if (this.items.length > 0) {
        const brands = []
        await this.items.forEach((el) => {
          if (!brands.includes(el.brand)) brands.push(el.brand)
        })
        await brands.sort()
        this.brands = brands.map((el, idx) => {
          return { value: el, label: el }
        })
        this.brands_ = brands.map((el, idx) => {
          return { value: el, text: el }
        })
      }
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
    },
    /** Скопировать в буффер */
    copyToBuffer(val) {
      writeText(`login: ${val.login} \npassword: ${val.password}`)
      this.$notify({
        message: 'Логин и пароль скопированы в буфер обмена',
        customClass: 'success-notyfy'
      })
    },
    /** Проверка и установка цвета текста */
    setColor(val) {
      const color = val.toLowerCase() === '#ffffff' ? '#333' : val
      return `color:${color}`
    }
  }
}
</script>
