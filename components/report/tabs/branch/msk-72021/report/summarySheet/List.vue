<template>
  <div>
    <div v-if="pageData.brands">
      <div class="col-9 offset-3" style="margin-top: -47px;">
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
        <div
          :class="['grid', loading ? 'disabled' : '']"
          style="margin: 0 20px"
        >
          <ag-grid-vue
            @grid-ready="onGridReady"
            @column-visible="onColumnVisible"
            @range-selection-changed="onRangeSelectionChanged"
            :columnDefs="commonСolumns"
            :rowData="pageData.brands"
            :headerHeight="20"
            :groupHeaderHeight="20"
            :floatingFiltersHeight="20"
            :rowHeight="30"
            :defaultColDef="{ menuTabs: [] }"
            :sideBar="sideBar"
            :suppressContextMenu="true"
            :style="`height: 79vh; min-width: ${windowWidth}px`"
            class="ag-theme-alpine"
          />
          <!--  -->
          <ag-grid-vue
            :columnDefs="totalColumns"
            :rowData="[pageData.total]"
            :headerHeight="20"
            :groupHeaderHeight="20"
            :floatingFiltersHeight="20"
            :rowHeight="30"
            :defaultColDef="{ menuTabs: [] }"
            :suppressContextMenu="true"
            :style="`height: 60px; min-width: ${windowWidth}px`"
            class="ag-theme-alpine hideTableHeader"
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
      commonСolumns: null,
      totalColumns: TotalColumns,
      gridApi: null,
      columnApi: null,
      processCellForClipboard: null,
      processCellFromClipboard: null,
      sideBar: {
        toolPanels: [
          {
            id: 'columns',
            labelDefault: 'Столбцы',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivots: true,
              suppressPivotMode: true,
              suppressSideButtons: true,
              suppressColumnFilter: true,
              contractColumnSelection: true
            }
          }
        ]
      },
      windowWidth: 1000, // ширина окна
      moreData: true // статус - показать/скрыть дополнительные данные
    }
  },
  watch: {
    pageData(val) {
      this.windowUpdate()
    }
  },
  beforeMount() {
    this.processCellForClipboard = (params) => {
      if (
        params.column.getColId() === 'athlete' &&
        params.value &&
        params.value.toUpperCase
      ) {
        return params.value.toUpperCase()
      }
      return params.value
    }

    this.processCellFromClipboard = (params) => {
      if (
        params.column.getColId() === 'athlete' &&
        params.value &&
        params.value.toLowerCase
      ) {
        return params.value.toLowerCase()
      }
      return params.value
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
     * Инициализация основной таблицы
     */
    onGridReady(data) {
      this.gridApi = data.api
      this.columnApi = data.columnApi

      // меняем видимость колонок
      const columns = СommonСolumns
      // eslint-disable-next-line
      const columnStatuses = JSON.parse(window.localStorage.getItem('summarySheetStatus'))

      columns.map((el) => {
        if (el.children) {
          // вложенные элементы
          el.children.forEach((element) => {
            // eslint-disable-next-line
            if (columnStatuses && columnStatuses.hasOwnProperty(element.field)) {
              element.hide = !columnStatuses[element.field]
            }
          })
          // не вложенные элементы
        } else if (columnStatuses && columnStatuses.hasOwnProperty(el.field)) {
          el.hide = !columnStatuses[el.field]
        }
      })
      this.commonСolumns = columns
    },

    /**
     * Колонки видимые/не видимые
     */
    onColumnVisible(params) {
      // eslint-disable-next-line
      let columns = JSON.parse(window.localStorage.getItem('summarySheetStatus'))
      if (!columns) columns = {}
      for (const item of params.columns) {
        columns[item?.colId] = item?.visible
      }
      columns[params.columns[0]?.colId] = params.columns[0]?.visible
      window.localStorage.setItem('summarySheetStatus', JSON.stringify(columns))
    },

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
    },

    /**
     * Работа с буфером обмена
     */
    onRangeSelectionChanged(event) {
      const cellRanges = this.gridApi.getCellRanges()
      const api = this.gridApi
      cellRanges.forEach(function(rng) {
        const startRow = Math.min(rng.startRow.rowIndex, rng.endRow.rowIndex)
        const endRow = Math.max(rng.startRow.rowIndex, rng.endRow.rowIndex)
        for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
          rng.columns.forEach(function(column) {
            const rowModel = api.getModel()
            const rowNode = rowModel.getRow(rowIndex)
            api.getValue(column, rowNode)
          })
        }
      })
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
