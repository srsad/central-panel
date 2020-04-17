<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerPartList"
    :before-close="onClose"
  >
    <!--  -->
    <div class="col-12" style="margin-top:-40px">
      <h3>Детали - {{ $store.state.source.page.categoryName }}</h3>
      <!--  -->
      <div class="partBtnContainer">
        <el-button
          @click="onCreatePart"
          title="Добавить деталь"
          icon="el-icon-plus"
          type="success"
          size="mini"
          plain
        />
      </div>
      <!--  -->
    </div>

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
                    width="420"
                    popper-class="popMaxHeight"
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
          <el-table-column property="price" width="120">
            <template slot="header">
              <div class="cell text-center">Цена<br />детали</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">{{ scope.row.price | toFix }}</div>
            </template>
          </el-table-column>
          <el-table-column
            property="rservice"
            label="Цена rservice"
            width="120"
          >
            <template slot="header">
              <div class="cell text-center">Цена<br />rservice</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">{{ scope.row.rservice | toFix }}</div>
            </template>
          </el-table-column>
          <el-table-column property="impuls" width="120">
            <template slot="header">
              <div class="cell text-center">Цена<br />impuls</div>
            </template>
            <template slot-scope="scope">
              <div class="text-center">{{ scope.row.impuls | toFix }}</div>
            </template>
          </el-table-column>
          <!-- actions -->
          <el-table-column width="100">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  @click="edit(scope.row)"
                  :loading="loading"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  title="Редактировать"
                  style="padding: 7px 8px"
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
                  style="padding: 7px 8px"
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
    /** Вызываем окно создания детали */
    onCreatePart() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreatePartItem',
        status: true
      })
    },
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
