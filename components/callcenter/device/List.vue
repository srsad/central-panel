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
        <template slot="header" slot-scope="scope">
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
      let result = this.deviceList

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

      await this.$store.dispatch(
        'repair/device/fetchByCategoryId',
        this.category._id
      )
    },

    async loadMalfunctionsList() {
      this.fastPrice = []

      if (!this.category?.malfunctions_id) return false

      const result = await this.$store.dispatch(
        'repair/malfunction/fetchById',
        this.category.malfunctions_id
      )
      this.fastPrice = result?.malfunctions
    },

    async showInfo(item) {
      await console.log('showInfo')
      // await this.$store.dispatch('source/page/setDeviceData', item)
      // await this.$store.commit('settings/SWITCH_DRAWNER', {
      //   dranwer: 'drawerDeviceMalf',
      //   status: true
      // })
    }
  }
}
</script>
