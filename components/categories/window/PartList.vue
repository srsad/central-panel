<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerPartList"
    :before-close="onClose"
    :title="`Детали - ${$store.state.source.page.categoryName}`"
  >
    <!-- :class="['row', !loadContent ? 'd-none' : '']" -->
    <div v-if="$store.getters['source/page/partsCategory']">
      <div class="col-12 mt-20">
        <el-table :data="$store.getters['source/page/partsCategory']" stripe>
          <!-- name -->
          <el-table-column property="name" label="Деталь">
            <template slot-scope="scope">
              <div class="partListCell">
                <el-popover
                  v-if="scope.row.excepts.length > 0"
                  placement="top-start"
                  trigger="hover"
                  content="Деталь имеет исключения"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    circle
                    icon="fa fa-question color-primary"
                  />
                </el-popover>
                <!--  -->
                <div>
                  <el-popover
                    v-if="scope.row.excepts.length > 0"
                    width="400"
                    placement="right"
                    trigger="click"
                  >
                    <el-table :data="scope.row.excepts" size="mini">
                      <el-table-column property="model" label="Модель" />
                      <el-table-column
                        property="price"
                        label="Цена"
                        width="100"
                      >
                        <!-- eslint-disable-next-line vue/no-template-shadow -->
                        <template slot-scope="scope">
                          {{ scope.row.price | toFix }}
                        </template>
                      </el-table-column>
                    </el-table>
                    <span
                      slot="reference"
                      class="partListCell__desc"
                      title="Кликните"
                    >
                      {{ scope.row.name }}
                    </span>
                  </el-popover>
                  <span v-else>{{ scope.row.name }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- end name -->
          <el-table-column property="price" label="Цена детали">
            <template slot-scope="scope">
              {{ scope.row.price | toFix }}
            </template>
          </el-table-column>
          <el-table-column property="rservice" label="Цена rservice">
            <template slot-scope="scope">
              {{ scope.row.rservice | toFix }}
            </template>
          </el-table-column>
          <el-table-column property="impuls" label="Цена impuls">
            <template slot-scope="scope">
              {{ scope.row.impuls | toFix }}
            </template>
          </el-table-column>
          <!-- actions -->
          <el-table-column>
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  @click="edit(scope.row)"
                  :loading="loading"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  title="Редактировать"
                />
              </el-button-group>
              <!--  -->
              <el-popconfirm
                @onConfirm="remove(scope.row)"
                title="Удалить деталь?"
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
                  title="Удалить"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
          <!-- end actions -->
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  filters: {
    toFix(value) {
      // округление числа
      return parseInt(value) ? `${parseInt(value).toFixed(0)} руб.` : value
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerPartList',
        status: false
      })
    },
    /** Редактировать деталь */
    edit(data) {
      this.$store.dispatch('source/page/setPart', data)
      // console.log('edit', data)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdatePartItem',
        status: true
      })
    },
    /** Удаление детали */
    async remove(data) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/part/remove/' + data._id)
        this.$notify({
          message: 'Деталь успушно удаленна!',
          customClass: 'success-notyfy'
        })
        this.$store.dispatch('source/page/getParts')
      } catch (e) {
        console.error('Не удалось удалить деталь', e)
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass">
.partListCell
  display: flex
  &__desc
    cursor: pointer
    border-bottom: 1px dashed #9e9399
  & .el-button--default
    padding: 4px 6px
    margin-right: 10px
</style>
