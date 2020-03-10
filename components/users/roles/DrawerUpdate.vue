<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerUpdateRole"
    :with-header="false"
    :before-close="close"
    @open="onOpen"
    title="Редактировать роль"
    custom-class="drawer"
  >
    <div
      v-loading="!loadContent"
      v-if="loadContent === false"
      class="mt-100"
      element-loading-text="Загрузка..."
      element-loading-spinner="el-icon-loading"
    />

    <el-form
      ref="treeRoleUpd"
      :model="form"
      :rules="rules"
      :disabled="loading"
      :class="['row m-15', !loadContent ? 'd-none' : '']"
    >
      <div class="col-12">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Роль" />
        </el-form-item>
      </div>
      <div class="col-12">
        <el-tree
          ref="tree"
          :data="data"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          show-checkbox
          node-key="_id"
          highlight-current
        />
        <!-- default-expand-all -->
      </div>
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Редактировать
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
import access from '../../../utils/access'

export default {
  data() {
    return {
      loadContent: false,
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: 'Роль',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
            trigger: 'blur'
          }
        ]
      },
      form: {
        name: '',
        access: []
      },
      data: access
    }
  },
  methods: {
    validateForm() {
      this.$refs.treeRoleUpd.validate((valid) => {
        if (valid) {
          this.form.access = this.$refs.tree.getCheckedKeys()
          if (this.form.access.length === 0) {
            this.$notify({
              message: 'Выберите хотябы один параметр!',
              customClass: 'error-notyfy'
            })
            return
          }
          this.onUpdate()
        } else {
          return false
        }
      })
    },
    async onUpdate() {
      this.loading = true
      try {
        const formData = this.form
        await this.$store.dispatch('users/updateRole', formData)
        this.$store.dispatch('users/fetchRoles')
        this.clearForm()
        this.$notify({
          message: 'Роль успушно обновлена!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerUpdateRole',
          status: false
        })
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    onOpen() {
      if (this.$store.getters['users/role']) {
        const item = this.$store.getters['users/role']
          ? JSON.parse(JSON.stringify(this.$store.getters['users/role']))
          : { name: '', access: [] }

        this.form._id = item._id
        this.form.name = item.name
        this.form.access = JSON.parse(JSON.stringify(item.access))

        if (item.access.length > 0) {
          // eslint-disable-next-line
          setTimeout(() => {
            this.$refs.tree.setCheckedKeys(item.access)
            this.onLoadContent()
          }, 1500)
        } else if (item.access.length === 0) {
          this.onLoadContent()
        }
      }
    },
    onLoadContent() {
      this.loadContent = true
    },
    clearForm() {
      this.form.name = ''
      this.form.access = []
      this.$refs.tree.setCheckedKeys([]) // отчистка выбранных элементов
      this.loadContent = false
    },
    close() {
      this.loadContent = false
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateRole',
        status: false
      })
    }
  }
}
</script>
