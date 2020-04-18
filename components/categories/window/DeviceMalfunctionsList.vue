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
        <h3>{{ deviceData.pagetitle }}</h3>
        <!--  -->
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
        <!--  -->
      </div>
      <!--  -->
      <div class="col-12 mt-20">
        <el-table :data="malfunctionsData" size="mini" stripe>
          <!-- name -->
          <el-table-column label="Неисправность">
            <template slot-scope="scope">
              <div class="fw-600">
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <!-- end name -->
          <!-- time -->
          <el-table-column width="150">
            <template slot="header">
              <div class="cell text-center">Время<br />ремонта</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">
                {{ scope.row.time }}
              </div>
            </template>
          </el-table-column>
          <!-- end time -->
          <!-- price -->
          <el-table-column width="150" label="Деталь">
            <template slot-scope="scope">
              <div>
                <div v-if="!scope.row.excepts && $abilities('part-create')">
                  <el-input
                    v-model="scope.row.price"
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
                    v-model="scope.row.price"
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
                    {{ scope.row.price }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- end price -->
          <!-- price-rservice -->
          <el-table-column width="150">
            <template slot="header">
              <div class="cell text-center">Цена ремонта<br />Rservice</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">{{ toFix(scope.row.rprice) }}</div>
            </template>
          </el-table-column>
          <!-- end price-rservice -->
          <!-- price-impuls -->
          <el-table-column width="150">
            <template slot="header">
              <div class="cell text-center">Цена ремонта<br />Impuls</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">{{ toFix(scope.row.iprice) }}</div>
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
      deviceData: null
    }
  },
  computed: {
    malfunctionsData() {
      return this.$store.getters['source/page/malfunctionsData']
    },
    loadContent() {
      return !!(this.deviceData && this.malfunctionsData)
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
      this.deviceData = this.$store.getters['source/page/deviceData']
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerDeviceMalf',
        status: false
      })
    },
    /** Добавить новое исключение и новую деталь */
    async addExcept(data) {
      // создание новой детали + исключение
      if (!data._id) {
        this.loading = true
        const rprice = parseInt(data.rprice)
          ? parseInt(data.rprice).toFixed(0)
          : data.rprice
        const iprice = parseInt(data.rprice)
          ? parseInt(data.rprice).toFixed(0)
          : data.rprice

        const formData = {
          name: data.name,
          brand: this.$store.state.source.page.params.name.toLowerCase(),
          category: this.$store.state.source.page.categoryName.toLowerCase(),
          price: data.price,
          impuls: iprice,
          rservice: rprice,
          excepts: [
            {
              model: this.$store.state.source.page.deviceData.pagetitle,
              price: data.price
            }
          ]
        }
        try {
          await this.$axios.$post('/api/v1/part/create', formData)
          // обновляем данные деталей/неисправностей категории
          await this.$store.dispatch('source/page/getParts')
          // обновляем текущий список неисправностей
          this.deviceData = this.$store.getters['source/page/deviceData']
        } catch (e) {
          this.$store.commit('SET_ERROR', e.response.data.message)
        } finally {
          this.loading = false
        }
      } else {
        // добавляем в существующую деталь новое исключение
        const part = await this.getPart(data)
        part.excepts.push({
          model: this.deviceData.pagetitle,
          price: data.price
        })
        this.updatePart(part)
      }
    },
    /** Обновить исключение */
    async updateExcept(data) {
      const part = await this.getPart(data)
      for (const idx in part.excepts) {
        if (part.excepts[idx].model === this.deviceData.pagetitle) {
          part.excepts[idx] = {
            model: this.deviceData.pagetitle,
            price: data.price
          }
        }
      }
      this.updatePart(part)
    },
    /** Удалить исключение */
    async removeExcept(data) {
      const part = await this.getPart(data)
      for (const idx in part.excepts) {
        if (part.excepts[idx].model === this.deviceData.pagetitle) {
          part.excepts.splice(idx, 1)
        }
      }
      this.updatePart(part)
    },
    /** Обновление детали */
    async updatePart(data) {
      this.loading = true
      try {
        await this.$axios.$put(`/api/v1/part/update/${data._id}`, data)
        // обновляем данные деталей/неисправностей категории
        await this.$store.dispatch('source/page/getParts')
        // обновляем текущий список неисправностей
        this.deviceData = this.$store.getters['source/page/deviceData']
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
