<template>
  <el-table
    :data="items"
    @row-dblclick="edit"
    empty-text="Нет данных"
    stripe
    class="w100"
  >
    <el-table-column prop="login" label="Логин" />
    <el-table-column prop="fullname" label="ФИО" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="role.name" label="Роль" />
    <el-table-column prop="created" label="Дата создания" />
    <el-table-column label="Действия" label-class-name="text-center">
      <template slot-scope="scope">
        <div class="text-center">
          <el-button-group>
            <el-button
              @click="edit(scope.row)"
              :loading="loading"
              size="mini"
              type="primary"
              icon="el-icon-edit"
            />
            <el-button
              @click="switchActive(scope.row)"
              :icon="`${scope.row.active ? 'el-icon-unlock' : 'el-icon-lock'}`"
              :title="
                `${scope.row.active ? 'Заблокировать' : 'Разблокировать'}`
              "
              :loading="loading"
              size="mini"
              type="info"
            />
            <el-popconfirm
              @onConfirm="remove(scope.$index, scope.row)"
              title="Удалить пользователя?"
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
        await this.$axios.$delete('/api/v1/user/remove/' + item._id)
        this.$store.dispatch('users/fetchUsers')
        this.$notify({
          message: 'Пользователь успушно удален!',
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
      this.$store.commit('users/SET_USER', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateUser',
        status: true
      })
    },
    async switchActive(item) {
      this.loading = true
      try {
        await this.$axios.$post('/api/v1/user/switch-active/' + item._id, {
          active: !item.active
        })
        this.$store.dispatch('users/fetchUsers')
        this.$notify({
          // eslint-disable-next-line prettier/prettier
          message: `Пользователь ${item.active ? 'заблокирован' : 'разблокирован'}!`,
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        throw e
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
