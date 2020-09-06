<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerCRMCreateStatus"
    :with-header="false"
    :before-close="onClose"
    @open="onOpen"
    title="Добавить статус"
    custom-class="drawer"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row m-15"
    >
      <div class="col-12"><h3 class="mb-20">Добавить статус</h3></div>
      <!-- name -->
      <el-form-item class="col-12" label="Статус" prop="name">
        <el-input v-model="form.name" size="small" placeholder="Статус">
          <el-color-picker
            slot="suffix"
            v-model="form.color"
            :predefine="predefineColors"
            size="small"
            style="margin: 4px -5px"
          />
        </el-input>
      </el-form-item>
      <!-- /name -->
      <!-- type -->
      <el-form-item class="col-12" label="Этап" prop="type">
        <el-select v-model="form.type" class="w100">
          <el-option
            v-for="(item, idx) of types"
            :key="idx"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- /type -->
      <!-- description -->
      <el-form-item class="col-12" label="Описание" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="Описание"
          maxlength="255"
          rows="3"
          show-word-limit
        />
      </el-form-item>
      <!-- /description -->
      <!-- access -->
      <el-form-item label="Статус доступен" class="col-12">
        <el-table :data="roles" style="width: 100%" size="mini">
          <el-table-column property="name" label="Роль" />
          <el-table-column label="Видеть заказ в статусе">
            <template slot="header" cell-class-name="center-checkbox">
              <span @click="toggleAllAvailable">
                <span style="font-size:12px;text-align:left;">
                  Видеть заказ<br />
                  в статусе
                </span>
              </span>
            </template>
            <template slot-scope="scope">
              <el-checkbox
                :value="form.access.available.includes(scope.row._id)"
                @change="onAccessAvailable(scope.row._id)"
              />
            </template>
          </el-table-column>
          <el-table-column label="Устанавливать статус">
            <template slot="header" cell-class-name="center-checkbox">
              <span @click="toggleAllChange">
                <span style="font-size:12px;text-align:left;">
                  Видеть заказ<br />
                  в статусе
                </span>
              </span>
            </template>
            <template slot-scope="scope">
              <el-checkbox
                :value="form.access.change.includes(scope.row._id)"
                @change="onAccessChange(scope.row._id)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- /access -->
      <!-- transition_here -->
      <el-form-item
        label="Статусы, которые могут переходить в этот статус"
        prop="transition_here"
        class="col-12"
      >
        <el-table
          ref="multipleTransitionHere"
          :data="$store.getters['crm/settings/statuses']"
          @selection-change="handleTransitionHere"
          style="width: 100%"
          size="mini"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column property="name" label="Статус" />
        </el-table>
      </el-form-item>
      <!-- /transition_here -->
      <!-- transition_there -->
      <el-form-item
        label="Статусы, в которые можно перевести этот статус"
        prop="transition_there"
        class="col-12"
      >
        <el-table
          ref="multipleTransitionThere"
          :data="$store.getters['crm/settings/statuses']"
          @selection-change="handleTransitionThere"
          style="width: 100%"
          size="mini"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column property="name" label="Статус" />
        </el-table>
      </el-form-item>
      <!-- /transition_there -->
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Создать
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      statusAvailable: false,
      form: {
        // общие
        name: '',
        type: 'inwork',
        description: '',
        access: {
          available: [],
          change: []
        },
        transition_here: [], // Статусы, которые могут переходить в этот статус
        transition_there: [], // Статусы, в которые можно перевести этот статус
        color: '#1E90FF',
        menuindex: 0,
        company: ''
      },
      types: [
        {
          value: 'new',
          label: 'Новые'
        },
        {
          value: 'inwork',
          label: 'На исполнении'
        },
        {
          value: 'ready',
          label: 'Готовые'
        },
        {
          value: 'successful',
          label: 'Закрытые успешно'
        },
        {
          value: 'deferred',
          label: 'Отложенные'
        },
        {
          value: 'rejection',
          label: 'Отказные'
        }
      ],
      predefineColors: [
        '#000000',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ],
      rules: {
        name: [
          {
            required: true,
            message: 'Введите статус',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символа',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: 'Выберите тип/этап',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    roles() {
      if (this.$store.getters['users/roles'].length === 0) {
        this.$store.dispatch('users/fetchRoles')
      }
      return this.$store.getters['users/roles']
    }
  },
  watch: {
    statusAvailable(val) {
      if (val) {
        this.form.access.available = this.roles.map((el) => el._id)
      } else {
        this.form.access.available = []
      }
    }
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.onCreate()
      })
    },
    async onCreate() {
      this.loading = true
      try {
        await this.$store.dispatch('crm/settings/create', this.form)
        this.clearForm()
        this.$notify({
          message: 'Статус успушно добавлен!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCRMCreateStatus',
          status: false
        })
        this.$store.dispatch('crm/settings/fetchItems')
      } catch (error) {
        //
      } finally {
        this.loading = false
      }
    },
    onOpen() {
      // список ролей
      this.form.access.available = this.roles.map((el) => el._id)
      this.form.access.change = this.roles.map((el) => el._id)

      // список статусов
      setTimeout(() => {
        this.$store.getters['crm/settings/statuses'].forEach((row) => {
          this.$refs.multipleTransitionHere.toggleRowSelection(row)
          this.$refs.multipleTransitionThere.toggleRowSelection(row)
        })
      }, 0)
    },
    clearForm() {
      this.form.name = ''
      this.form.type = 'inwork'
      this.form.description = ''
      this.form.access.available = []
      this.form.access.change = []
      this.form.transition_here = []
      this.form.transition_there = []
      this.form.color = '#1E90FF'
      this.form.menuindex = 0
      this.form.company = ''

      this.loading = false
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCRMCreateStatus',
        status: false
      })
    },
    /**
     * Добавить/удалить в список - доступы -> видит
     */
    onAccessAvailable(roleId) {
      const available = this.form.access.available
      if (available.includes(roleId)) {
        this.form.access.available.splice(available.indexOf(roleId), 1)
      } else {
        this.form.access.available.push(roleId)
      }
    },
    /**
     * Добавить/удалить в список - доступы -> меняет
     */
    onAccessChange(roleId) {
      const change = this.form.access.change
      if (change.includes(roleId)) {
        this.form.access.change.splice(change.indexOf(roleId), 1)
      } else {
        this.form.access.change.push(roleId)
      }
    },
    /**
     * Отметить/убрать все в - доступы -> видит
     */
    toggleAllAvailable() {
      if (this.form.access.available.length === this.roles.length) {
        this.form.access.available = []
      } else {
        this.form.access.available = this.roles.map((el) => el._id)
      }
    },
    /**
     * Отметить/убрать все в - доступы -> меняет
     */
    toggleAllChange() {
      if (this.form.access.change.length === this.roles.length) {
        this.form.access.change = []
      } else {
        this.form.access.change = this.roles.map((el) => el._id)
      }
    },
    /**
     * Отметить/убрать все в - статусы, которые могут переходить в этот статус
     */
    toggleTransitionHere(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTransitionHere.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTransitionHere.clearSelection()
      }
    },
    handleTransitionHere(val) {
      this.form.transition_here = val.map((el) => el._id)
    },
    /**
     * Отметить/убрать все в - статусы, которые могут переходить в этот статус
     */
    toggleTransitionThere(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTransitionThere.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTransitionThere.clearSelection()
      }
    },
    handleTransitionThere(val) {
      this.form.transition_there = val.map((el) => el._id)
    }
  }
}
</script>
