<template>
  <div>
    <div v-if="pageData.brands">
      <div class="col-12">
        <!-- показать/скрыть дополнительные бренды -->
        <el-button
          @click="toogleMoreData"
          :loading="loading"
          class="pt-10 mb-10 pointer"
          type="default"
          size="mini"
          icon="el-icon-view"
        >
          {{ moreData ? 'Показать' : 'Скрыть' }} дополнительные бренды
        </el-button>
        <!-- /показать/скрыть дополнительные бренды -->
      </div>
      <!--  -->
      <no-ssr>
        <div :class="['grid', loading ? 'disabled' : '']">
          <ag-grid-vue
            :columnDefs="commonСolumns"
            :rowData="pageData.brands"
            :headerHeight="80"
            :groupHeaderHeight="20"
            :floatingFiltersHeight="20"
            :defaultColDef="{ menuTabs: [] }"
            :suppressContextMenu="true"
            :style="`height: 69vh; min-width: ${windowWidth}px`"
            class="ag-theme-alpine"
          />
          <!--  -->
          <ag-grid-vue
            :columnDefs="totalColumns"
            :rowData="[pageData.total]"
            :headerHeight="80"
            :groupHeaderHeight="20"
            :floatingFiltersHeight="20"
            :defaultColDef="{ menuTabs: [] }"
            :suppressContextMenu="true"
            :style="`height: 163px; min-width: ${windowWidth}px`"
            class="ag-theme-alpine"
          />
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import СommonСolumns from './commonСolumns'
import TotalColumns from './totalColumns'

export default {
  props: {
    // реальные данные
    pageData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      commonСolumns: СommonСolumns,
      totalColumns: TotalColumns,
      windowWidth: 1000, // ширина окна
      moreData: false // статус - показать/скрыть дополнительные данные
    }
  },
  watch: {
    pageData(val) {
      this.tableData = val.brands
      this.windowUpdate()
    }
  },
  mounted() {
    // считаем ширину таблицы
    window.addEventListener('resize', (e) => {
      this.windowUpdate()
    })
  },
  methods: {
    /**
     * Обновляем ширину окна
     */
    windowUpdate() {
      let time = 30
      const timeValue = setInterval((interval) => {
        const item = document.querySelector('#branchWidth')
        if (item.clientWidth) this.windowWidth = item.clientWidth - 50

        time -= 1
        if (time <= 0) {
          clearInterval(timeValue)
        }
      }, 2000)
    },

    /**
     * показываем/скрываем дополнительные данные
     */
    toogleMoreData() {
      this.moreData = !this.moreData
      this.$emit('toogleMoreData', this.moreData)
    }
  }
}
</script>

<style>
.updateTable {
  padding: 5px 8px;
}
.updateTable2 {
  padding: 7px 8px;
}
.saveTable {
  padding: 7px 8px;
}
.removeTable {
  padding: 7px 8px !important;
}
.input-transparent input {
  padding-right: 7px !important;
}
.el-table th > .cell {
  font-weight: 400;
  font-size: 13px;
  color: black;
}
.removeTableRow,
.updateTableRow {
  position: absolute;
  z-index: 9;
  bottom: 7px;
  left: 8px;
  padding: 3px;
}
.removeTableRow {
  padding: 4px !important;
  height: 20px;
  left: 32px;
}
</style>
