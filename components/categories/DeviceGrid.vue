<template>
  <div>
    <el-table
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
          <app-recording-device :name="scope.row.pagetitle" />
          <b class="color-000">{{ scope.row.pagetitle }}</b>
        </template>
      </el-table-column>
      <el-table-column prop="tv_filterPhone" label="Серия" />
    </el-table>
  </div>
</template>

<script>
import AppRecordingDevice from '~/components/categories/DeviceRecording'

export default {
  components: {
    AppRecordingDevice
  },
  data() {
    return {
      searchModel: ''
    }
  },
  computed: {
    deviceList() {
      return this.$store.getters['source/page/deviceList']
    },
    searchDevice() {
      const model = this.searchModel.toLowerCase()
      let result = this.deviceList

      if (model.length > 0) {
        result = result.filter((device) => {
          return device.pagetitle.toLowerCase().match(model)
        })
      }

      return result
    }
  },
  methods: {
    async showInfo(item) {
      await this.$store.dispatch('source/page/setDeviceData', item)
      await this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerDeviceMalf',
        status: true
      })
    }
  }
}
</script>
