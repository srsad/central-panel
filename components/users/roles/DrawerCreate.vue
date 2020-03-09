<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerCreate"
    :with-header="false"
    :before-close="onClose"
    title="Создать новую роль"
    custom-class="drawer"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
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
          Создать
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
import access from '../../../utils/access'

export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        access: []
      },
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
      data: access
    }
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.access = this.$refs.tree.getCheckedKeys()
          if (this.form.access.length === 0) {
            this.$notify({
              message: 'Выберите хотябы один параметр!',
              customClass: 'error-notyfy'
            })
            return
          }
          this.onCreate()
        } else {
          return false
        }
      })
    },
    async onCreate() {
      this.loading = true
      try {
        const formData = this.form
        await this.$store.dispatch('users/createRole', formData)
        this.$store.dispatch('users/fetchRoles')
        this.clearForm()
        this.$notify({
          message: 'Роль успушно добавленна!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreate',
          status: false
        })
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    clearForm() {
      this.form.name = ''
      this.form.access = []
      this.loadContent = false
      this.$refs.tree.setCheckedKeys([]) // отчистка выбранных элементов
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreate',
        status: false
      })
    }
  }
}
</script>
