<template>
  <el-table
    :data="items"
    @row-dblclick="edit"
    empty-text="Нет данных"
    stripe
    class="w100"
  >
    <el-table-column prop="name" label="Роль"> </el-table-column>
    <el-table-column prop="username" label="Кто создал"> </el-table-column>
    <el-table-column prop="created" label="Дата создания"> </el-table-column>
    <el-table-column label="Действия" label-class-name="text-center">
      <template slot-scope="scope">
        <div class="text-center">
          <el-button-group>
            <el-tooltip content="Редактировать" placement="left">
              <el-button
                @click="edit(scope.row)"
                :loading="loading"
                type="primary"
                size="mini"
                icon="el-icon-edit"
              />
            </el-tooltip>
            <el-popconfirm
              @onConfirm="remove(scope.$index, scope.row)"
              title="Удалить роль?"
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
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async remove(idx, item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/role/remove/' + item._id)
        this.$store.dispatch('users/fetchRoles')
        this.$notify({
          message: 'Роль успушно удалена!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        throw e
      } finally {
        this.loading = false
      }
    },
    edit(item) {
      if (this.loading === true) return
      this.$store.commit('users/SET_ROLE', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateRole',
        status: true
      })
    }
  }
}
</script>
