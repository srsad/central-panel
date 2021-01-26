<template>
  <div>
    <div>
      <el-table
        :data="domains"
        @row-dblclick="edit"
        :row-style="tableRowStyle"
        :empty-text="$store.getters['domains/emptyText']"
        height="calc(100vh - 140px)"
        size="mini"
      >
        <el-table-column label="" width="10">
          <template slot-scope="scope">
            <div
              :style="
                `position:absolute;top:0;left:0;width:100%;height:100%;background:${scope.row.color};`
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="dcod" label="Филиал" width="80">
          <template slot-scope="scope">
            <div :title="scope.row.name" class="ws-normal">
              {{ scope.row.dcod | shortCode }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Объект" width="150">
          <template slot-scope="scope">
            <div :title="scope.row.name" class="ws-normal">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Домен" width="250">
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
        <el-table-column label="Alloka" width="110">
          <template slot-scope="scope">
            <div :title="scope.row.alloka.id" class="ws-normal">
              {{ scope.row.alloka.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="envybox.id" label="Envybox" width="110">
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
              <el-button-group>
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
                `${scope.row.status ? 'Сделать не активным' : 'Сделать активным'}`
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
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { shortCodeForCodes } from '~/utils/brancheCodes'

export default {
  filters: {
    filterPhone(str) {
      const phone = str.match(/\d*(-|)\d*(-)\d*/)
      return phone ? phone[0] : str
    },

    /**
     * Возвращает шорткод по dcod
     */
    shortCode(str) {
      let res = '---'
      if (!str) return res

      const dcod = str.split('.')
      res = shortCodeForCodes.get(dcod[0])
      return res || '---'
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
    }
  }
}
</script>
