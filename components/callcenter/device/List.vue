<template>
  <div v-loading="loading">
    <el-table
      v-if="deviceList.length > 0"
      @row-click="showInfo"
      :data="searchDevice"
      empty-text="Нет данных"
      row-class-name="cursor-pointer"
      stripe
    >
      <el-table-column prop="pagetitle" label="Модель">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template slot="header">
          <div class="d-flex">
            <div class="cell">Модель</div>
            <i class="fa fa-filter" style="padding:5px 10px 0 0" />
            <el-input
              v-model="searchModel"
              size="mini"
              style="display:inline;width:150px"
              placeholder="Поиск по модели"
              clearable
            />
          </div>
        </template>
        <template slot-scope="scope">
          <!-- удаление устройства -->
          <span v-if="$abilities('device-remove')" @click.stop>
            <el-popconfirm
              @onConfirm="removeDevice(scope.row)"
              title="Удалить устройство?"
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
                class="category__remove"
              />
            </el-popconfirm>
          </span>
          <!-- /у даление устройства -->
          <app-recording-device :name="scope.row.name" />
          <b class="color-000">{{ scope.row.name }}</b>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="Серия" /> -->
    </el-table>

    <app-fast-price
      v-else-if="fastPrice.length > 0 && !loading"
      :fast-price="fastPrice"
    />
  </div>
</template>

<script>
import AppRecordingDevice from '~/components/categories/DeviceRecording'
import AppFastPrice from '~/components/callcenter/device/FastPrice'

export default {
  name: 'DeviceList',

  components: {
    AppRecordingDevice,
    AppFastPrice
  },

  props: {
    category: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      loading: false,
      searchModel: '',
      fastPrice: []
    }
  },

  computed: {
    deviceList() {
      return this.$store.state.repair.device.devices
    },
    searchDevice() {
      const model = this.searchModel.toLowerCase()
      let result = this.$store.state.repair.device.devices

      if (model.length > 0) {
        result = result.filter((device) => {
          return device.name.toLowerCase().match(model)
        })
      }

      return result
    }
  },

  watch: {
    category() {
      this.loading = true
      Promise.all([this.loadDeviceList(), this.loadMalfunctionsList()]).then(
        () => {
          this.loading = false
        }
      )
    }
  },

  methods: {
    async loadDeviceList() {
      if (!this.category?._id) return false

      this.loading = true

      await this.$store.dispatch(
        'repair/device/fetchByCategoryId',
        this.category._id
      )

      this.loading = false
    },

    async loadMalfunctionsList() {
      this.fastPrice = []

      if (!this.category?.malfunctions_id) return false

      const malfunctionList = await this.$store.dispatch(
        'repair/malfunction/fetchById',
        this.category.malfunctions_id
      )

      const malfunctionData = malfunctionList?.malfunctions
      const partsCategory = this.$store.getters['repair/category/partsCategory']

      if (malfunctionData) {
        for (const item of malfunctionData) {
          // eslint-disable-next-line
          const hasItem = partsCategory.find((el) => el.name === item.name) || null
          if (hasItem) {
            this.fastPrice.push({
              ...item,
              // тут наоборот(
              price: hasItem.rservice, // цена ремонта
              partPrice: hasItem.price, // цена детали
              isParts: true
            })
          } else {
            this.fastPrice.push(item)
          }
        }
      }

      if (partsCategory) {
        for (const item of partsCategory) {
          const hasItem = this.fastPrice.some((el) => el.name === item.name)
          if (!hasItem) {
            this.fastPrice.push({
              name: item.name,
              price: item.rservice, // цена ремонта
              partPrice: item.price, // цена ремонта
              isParts: true
            })
          }
        }
      }
    },

    async showInfo(item) {
      await this.$store.commit('repair/device/SET_DEVICE', item)
      await this.$store.dispatch('repair/device/setMalfunctionsForDevice', item)
      await this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerDeviceMalf',
        status: true
      })
    },

    async removeDevice(item) {
      try {
        await this.$axios.$delete('/api/v1/repair/device/remove/' + item._id)

        this.$store.dispatch('repair/device/localRemove', item._id)
      } catch (error) {
        console.error('Ошибка при попытке удаления устройства', error.response)
        this.$store.commit('SET_ERROR', error.response.data.message)
      }
    }
  }
}
</script>
