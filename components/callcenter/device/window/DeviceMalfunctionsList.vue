<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerDeviceMalf"
    :before-close="onClose"
    @open="onOpen"
    width="60%"
  >
    <div
      v-loading="!loadContent"
      v-if="loadContent === false"
      class="mt-100"
      element-loading-text="Загрузка..."
      element-loading-spinner="el-icon-loading"
    />
    <div
      v-if="deviceData"
      :class="['row', !loadContent ? 'd-none' : '']"
      style="margin-top: -40px"
    >
      <!--  -->
      <div class="col-12">
        <h3>{{ deviceData.name }}</h3>
        <div v-if="$abilities('part-create')" class="partBtnContainer">
          <el-button
            @click="onCreatePart"
            title="Добавить деталь"
            icon="el-icon-plus"
            type="success"
            size="mini"
            plain
          />
        </div>
      </div>
      <!--  -->
      <div class="col-12 mt-20">
        <el-table :data="searchMalfunction" size="mini" stripe>
          <!-- name -->
          <el-table-column prop="name" label="Неисправность">
            <!-- eslint-disable-next-line vue/no-unused-vars -->
            <template slot="header">
              <div class="d-flex">
                <div class="cell">Неисправность</div>
                <!-- <i class="fa fa-filter" style="padding:5px 10px 0 0" /> -->
                <!-- <el-input
                  v-model="searchMalf"
                  size="mini"
                  style="display:inline;width:150px"
                  placeholder="Поиск по неисправности"
                  clearable
                /> -->
              </div>
            </template>
            <template slot-scope="scope">
              <div class="fw-600">
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <!-- end name -->
          <!-- time -->
          <el-table-column width="180">
            <template slot="header">
              <div class="cell text-center">Время ремонта</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">{{ scope.row.time }} мин.</div>
            </template>
          </el-table-column>
          <!-- end time -->
          <!-- price -->
          <el-table-column width="180" label="Деталь">
            <template slot-scope="scope">
              <div>
                <div v-if="!scope.row.excepts && $abilities('part-create')">
                  <el-input
                    v-model="scope.row.partPrice"
                    :disabled="loading"
                    size="mini"
                    class="input-transparent"
                  >
                    <i
                      slot="suffix"
                      @click="addExcept(scope.row)"
                      title="Добавить исключение"
                      class="el-icon-plus color-success pt-10 pointer"
                    />
                  </el-input>
                </div>
                <div v-else>
                  <el-input
                    v-if="
                      $abilities('part-update') || $abilities('part-remove')
                    "
                    v-model="scope.row.partPrice"
                    :disabled="loading"
                    size="mini"
                    class="input-transparent"
                  >
                    <i
                      slot="suffix"
                      v-if="$abilities('part-update')"
                      @click="updateExcept(scope.row)"
                      class="el-icon-edit color-primary pt-10 pointer"
                    />
                    <el-popconfirm
                      slot="suffix"
                      v-if="$abilities('part-remove')"
                      @onConfirm="removeExcept(scope.row)"
                      title="Удалить исключение?"
                      confirm-button-text="Да"
                      confirm-button-type="success"
                      cancel-button-type="default"
                      cancel-button-text="Нет, спасибо"
                    >
                      <i
                        slot="reference"
                        class="el-icon-delete color-danger pt-10 pointer"
                        style="padding-left:7px"
                      />
                    </el-popconfirm>
                  </el-input>
                  <div v-else>
                    {{ scope.row.partPrice }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- end price -->
          <!-- price-impuls -->
          <el-table-column width="150">
            <template slot="header">
              <div class="cell text-center">Цена ремонта</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">{{ scope.row.price }}</div>
            </template>
          </el-table-column>
          <!-- end price-impuls -->
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
/**
 * Список неисправностей устройства
 */
export default {
  data() {
    return {
      loading: false,
      searchMalf: '',
      deviceData: null
    }
  },
  computed: {
    malfunctionsData() {
      return JSON.parse(
        JSON.stringify(this.$store.getters['repair/device/malfunctions'])
      )
    },
    loadContent() {
      return !!(this.deviceData && this.malfunctionsData)
    },
    searchMalfunction() {
      const malfunction = this.searchMalf.toLowerCase()
      let result = this.malfunctionsData

      if (malfunction.length > 0) {
        result = result.filter((val) => {
          return val.name.toLowerCase().match(malfunction)
        })
      }
      return result
    }
  },
  methods: {
    /** Вызываем окно создания детали */
    onCreatePart() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreatePartItem',
        status: true
      })
    },
    onOpen() {
      this.searchMalf = ''
      this.deviceData = this.$store.getters['repair/device/device']
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerDeviceMalf',
        status: false
      })
      this.$store.commit('repair/device/SET_DEVICE', null)
    },
    /** Добавить новое исключение и новую деталь */
    async addExcept(data) {
      if (!data.partPrice.trim()) return

      // создание новой детали + исключение
      if (!data._id) {
        this.loading = true

        const formData = {
          name: data.name,
          brand: this.$store.state.repair.brand.brand.name.toLowerCase(),
          category: this.$store.state.repair.category.selectCategory.name.toLowerCase(),
          price: '',
          // impuls: iprice,
          rservice: data.price,
          excepts: [
            {
              model: this.$store.state.repair.device.device.name,
              price: data.partPrice
            }
          ]
        }

        try {
          await this.$axios.$post('/api/v1/part/create', formData)
          // // обновляем данные деталей/неисправностей категории
          await this.$store.dispatch('repair/category/getParts')
          await this.$store.dispatch('repair/device/setMalfunctionsForDevice')
          // // обновляем текущий список неисправностей
          // this.deviceData = this.$store.getters['repair/category/deviceData']
        } catch (e) {
          this.$store.commit('SET_ERROR', e.response.data.message)
        } finally {
          this.loading = false
        }
      } else {
        // добавляем в существующую деталь новое исключение
        const part = await this.getPart(data)
        part.excepts.push({
          model: this.deviceData.name,
          price: data.partPrice
        })

        this.updatePart(part)
      }
    },
    /** Обновить исключение */
    async updateExcept(data) {
      const part = await this.getPart(data)
      for (const idx in part.excepts) {
        if (part.excepts[idx].model === this.deviceData.name) {
          part.excepts[idx] = {
            model: this.deviceData.name,
            price: data.partPrice
          }
        }
      }
      this.updatePart(part)
    },
    /** Удалить исключение */
    async removeExcept(data) {
      const part = await this.getPart(data)
      for (const idx in part.excepts) {
        if (part.excepts[idx].model === this.deviceData.name) {
          part.excepts.splice(idx, 1)
        }
      }

      if (!part.excepts.length && !part.price) {
        this.remove(part)
      } else {
        this.updatePart(part)
      }
    },

    /** Удаление детали */
    async remove(data) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/part/remove/' + data._id)
        this.$notify({
          message: 'Деталь успушно удаленна!',
          customClass: 'success-notyfy'
        })
        await this.$store.dispatch('repair/category/getParts')
        await this.$store.dispatch('repair/device/setMalfunctionsForDevice')
        // обновляем текущий список неисправностей
        this.deviceData = this.$store.getters['repair/device/device']
      } catch (e) {
        console.error('Не удалось удалить деталь', e)
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /** Обновление детали */
    async updatePart(data) {
      this.loading = true
      try {
        await this.$axios.$put(`/api/v1/part/update/${data._id}`, data)
        // обновляем данные деталей/неисправностей категории
        await this.$store.dispatch('repair/category/getParts')
        await this.$store.dispatch('repair/device/setMalfunctionsForDevice')
        // обновляем текущий список неисправностей
        this.deviceData = this.$store.getters['repair/device/device']
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    /** Получение детали */
    async getPart(data) {
      try {
        return await this.$axios.$get('/api/v1/part/get/' + data._id)
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },
    /** округление числа */
    toFix(value) {
      return parseInt(value) ? parseInt(value).toFixed(0) + ' руб.' : value
    }
  }
}
</script>
