<template>
  <div>
    <div>
      <!-- :row-style="tableRowStyle" -->
      <el-table
        :data="domains"
        @row-dblclick="edit"
        :row-class-name="tableRowClass"
        :span-method="rowSpanMethod"
        :empty-text="$store.getters['domains/emptyText']"
        class="domainTable"
        height="calc(100vh - 140px)"
        size="mini"
      >
        <!-- <el-table-column label="" width="10">
          <template slot-scope="scope">
            <div
              :style="
                `position:absolute;top:0;left:0;width:100%;height:100%;background:${scope.row.color};`
              "
            />
          </template>
        </el-table-column> -->
        <el-table-column prop="dcod" label="Филиал" width="80">
          <template slot-scope="scope">
            <div :title="scope.row.name" class="ws-normal firstColumn">
              {{ shortCode(scope.row.dcod) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="brand" label="Объект" width="150">
          <template slot-scope="scope">
            <div :title="scope.row.brand" class="ws-normal brandName">
              {{ scope.row.brand }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Домен" width="180">
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
        <el-table-column width="60">
          <div slot-scope="scope" class="text-right">
            {{ getAdType(scope.row.dcod) }}
          </div>
        </el-table-column>
        <el-table-column label="Заглушка" width="100">
          <template slot-scope="scope">
            <div :title="scope.row.phone_default" class="ws-normal">
              {{ scope.row.phone_default | filterPhone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Метрика" width="80">
          <template slot-scope="scope">
            <div :title="scope.row.yametrika.id" class="ws-normal">
              {{ scope.row.yametrika.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Analytics" width="110">
          <template slot-scope="scope">
            <div :title="scope.row.analytics.id" class="ws-normal">
              {{ scope.row.analytics.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Alloka" width="130">
          <template slot-scope="scope">
            <div :title="scope.row.alloka.id" class="ws-normal">
              {{ scope.row.alloka.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="envybox.id" label="Envybox" width="240">
          <template slot-scope="scope">
            <div :title="scope.row.envybox.id" class="ws-normal">
              {{ scope.row.envybox.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="$abilities('domains-update') || $abilities('domains-remove')"
        >
          <div slot="header">
            Действия
            <el-button
              @click="createDomain"
              type="success"
              size="mini"
              icon="el-icon-plus"
              style="margin-left: 30px"
            />
          </div>
          <template slot-scope="scope">
            <div>
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
                  `${
                    scope.row.status
                      ? 'Сделать не активным'
                      : 'Сделать активным'
                  }`
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
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
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
    },
    loading: {
      type: Boolean,
      default: false
    },
    dcod: {
      type: String,
      default: '00'
    }
  },
  computed: {
    domains() {
      let res = this.items
      if (this.dcod === '00') return res

      res = this.items.filter((el) => {
        const dcod = el.dcod.split('.')
        if (dcod[0] === this.dcod) return el
      })

      return res
    }
  },
  methods: {
    /**
     * Создать домен
     */
    createDomain() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateDomains',
        status: true
      })
    },

    /**
     * Удаление домена
     */
    remove(idx, item) {
      this.$emit('remove', { idx, item })
    },

    /**
     * Обновление домена
     */
    edit(item) {
      this.$emit('edit', item)
    },

    /**
     * Смена статуса
     */
    switchStatus(item) {
      this.$emit('switchStatus', item)
    },

    /**
     * Подцветка строк и проверка на активность
     */
    tableRowStyle({ row, rowIndex }) {
      const style = {}
      if (!row.status) style.opacity = '0.6'
      return style
    },

    /**
     * Подцветка строк и проверка на активность
     */
    tableRowClass({ row, rowIndex }) {
      // console.log('tableRowClass', row.status)
      return !row.status ? 'dontActiveRow' : ''
    },

    /**
     * Метод для обеденения строк таблицы
     */
    rowSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (row.rowspan > 0) {
          // если этот элемент входит в группу
          if (row.rowspan === 999) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          // группируем
          return {
            rowspan: row.rowspan + 1,
            colspan: 1
          }
        } else {
          // иначе отдаем простую строку
          return {
            rowspan: 1,
            colspan: 1
          }
        }
      }
    },

    /**
     * Возвращает шорткод по dcod
     */
    shortCode(str) {
      let res = '---'
      if (!str) return res

      const dcod = str.split('.')
      // eslint-disable-next-line
      res = this.$store.getters['report/branch/branches'].find((el) => el.short_num_code === dcod[0])

      return res?.short_code || '---'
    },

    /**
     * Возвращает тип рекламы по dcod
     */
    getAdType(str) {
      if (!str) return '-'

      const dcod = str.split('.')
      switch (dcod[3]) {
        case '01':
          return 'YD'
        case '02':
          return 'GA'
        default:
          return 'YD GA'
      }
    }
  }
}
</script>

<style>
.domainTable [colspan='1'] {
  padding: 0px 0;
}
.domainTable .el-button--mini {
  padding: 2px 4px;
  margin-left: 0px;
}
.domainTable .dontActiveRow [rowspan='1'] {
  opacity: 0.6;
}
.brandName {
  font-size: 18px;
  font-weight: 600;
}
.firstColumn {
  height: 47px;
  display: grid;
  align-items: center;
  justify-content: center;
}
</style>
