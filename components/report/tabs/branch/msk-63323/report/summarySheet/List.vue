<template>
  <div>
    <div v-if="pageData.brands">
      <!--  -->
      <no-ssr>
        <div :class="['grid', loading ? 'disabled' : '']">
          <v-grid
            :source="pageData.brands"
            :columns="commonСolumns"
            :resize="true"
            :col-size="70"
            :column-types="columnTypes"
            :style="`height: 69vh; max-width: ${windowWidth}px`"
            class="global-grid-small main-summory-table"
            theme="compact"
          />
          <!-- :pinnedTopSource="pinnedTopSource" -->
          <!--  -->
          <v-grid
            :source="[pageData.total]"
            :columns="totalColumns"
            :resize="true"
            :col-size="70"
            :columnTypes="columnTypes"
            :style="`height: 150px; max-width: ${windowWidth}px`"
            class="global-grid-small total-summory-table"
            theme="compact"
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
      columnTypes: {}, // типы колонок таблицы
      commonСolumns: СommonСolumns,
      totalColumns: TotalColumns,
      windowWidth: 1000 // ширина окна
    }
  },
  watch: {
    pageData(val) {
      this.windowUpdate()
    }
  },
  mounted() {
    import('@revolist/vue-datagrid').then((m) => {
      const types = {}
      Promise.all([
        // eslint-disable-next-line
        import('@revolist/revogrid-column-numeral').then((p) => (types.number = new p.default('0,0')))
      ]).then(() => {
        this.columnTypes = types
      })
    })

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
     * Сохраняем данные после итогового подсчета
     */
    setTotalDataTable(data) {
      this.pageData.total = data.total
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
