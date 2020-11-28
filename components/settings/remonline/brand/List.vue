<template>
  <div>
    <el-table
      :data="$store.getters['report/brand/brands']"
      @row-dblclick="edit"
      :empty-text="$store.getters['domains/emptyText']"
      size="mini"
    >
      <el-table-column prop="idx" width="50" label="#" />
      <el-table-column prop="name" label="Бренд" />
      <el-table-column label="Действия" label-class-name="text-center">
        <template slot-scope="scope">
          <div class="text-center">
            <el-button-group>
              <el-button
                @click="edit(scope.row)"
                :loading="loading"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                title="Редактировать"
              />
              <el-popconfirm
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
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    edit(item) {
      this.$store.commit('report/brand/SET_BRAND', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportSummarySheetUpdateBrand',
        status: true
      })
    },
    async remove(idx, item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/report/brand/remove/' + item._id)
        await this.$store.dispatch('report/brand/fetchItems')
        this.$notify({
          message: 'Бренд удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
