<template>
  <el-drawer
    :visible.sync="$store.state.settings.drawerUpdatePartItem"
    :with-header="false"
    :before-close="onClose"
    @opened="onOpen"
    title="Обновить деталь"
    custom-class="drawer"
  >
    <pre>
      {{ part }}
    </pre>
    <el-dropdown
      @click="onSaveOne"
      @command="onSaveMany"
      split-button
      placement="top-end"
      trigger="click"
      type="success"
    >
      Сохранить
      <el-dropdown-menu slot="dropdown" trigger="click">
        <el-dropdown-item command="updateMany" icon="fa fa-floppy-o">
          Сохранить все зависимости
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-drawer>
</template>

<script>
export default {
  computed: {
    part() {
      return JSON.parse(JSON.stringify(this.$store.state.source.page.partItem))
    }
  },
  methods: {
    /** Сохранить изменения только у выбранной позиции */
    onSaveOne() {
      console.log('onSaveOne')
    },
    onSaveMany() {
      console.log('onSaveMany')
    },
    onClose() {
      this.$store.dispatch('source/page/setPart', null)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdatePartItem',
        status: false
      })
    },
    onOpen() {
      console.log('onOpen')
    }
  }
}
</script>
