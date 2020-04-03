<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerDeviceMalf"
    :before-close="onClose"
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
      <div class="col-12">
        <h3>{{ deviceData.pagetitle }}</h3>
      </div>
      <div class="col-12 mt-20">
        <el-table :data="malfunctionsData" stripe>
          <el-table-column property="pagetitle" label="Нисправность" />
          <el-table-column property="value" label="Время ремонта" width="150">
            <template slot-scope="scope">{{ scope.row.value }}</template>
          </el-table-column>
          <el-table-column
            property="price"
            label="Цена ремонта Rservice"
            width="120"
          >
            <template slot-scope="scope">
              {{ toFix(scope.row.price) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  computed: {
    deviceData() {
      return this.$store.getters['source/page/deviceData']
    },
    malfunctionsData() {
      return this.$store.getters['source/page/malfunctionsData']
    },
    loadContent() {
      const res = !!(this.deviceData && this.malfunctionsData)
      return res
    }
  },
  methods: {
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerDeviceMalf',
        status: false
      })
    },
    /** округление числа */
    toFix(value) {
      return parseInt(value) ? parseInt(value).toFixed(0) + ' руб.' : '-'
    }
  }
}
</script>
