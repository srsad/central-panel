<template>
  <!-- router -->
  <el-menu @select="handleSelect" mode="horizontal" class="sticky-top">
    <el-menu-item index="/constructor">
      <i class="el-icon-back" />
    </el-menu-item>
    <!--  -->
    <el-submenu index="size">
      <template slot="title">Размер экрана</template>
      <el-menu-item index="xxl">Extra extra large (xxl)</el-menu-item>
      <el-menu-item index="xl">Extra large (xl)</el-menu-item>
      <el-menu-item index="lg">Large (lg)</el-menu-item>
      <el-menu-item index="md">Medium (md)</el-menu-item>
      <el-menu-item index="sm">Small (sm)</el-menu-item>
      <el-menu-item index="xs">Extra small (xs)</el-menu-item>
    </el-submenu>
    <!--  -->
  </el-menu>
</template>

<script>
export default {
  methods: {
    /**
     * При выборе действия в навигации
     */
    handleSelect(key, keyPath) {
      switch (keyPath.length) {
        // если 2 параметра то команда + действие
        case 2:
          this.navAction(keyPath)
          break
        // если 1 то роут
        case 1:
          this.$router.push(key)
          break
      }
    },

    /**
     * Если пользователь выбрал событие в навигации
     * @param {Array} action - событие состоит из двух значений. 0 - действие, 1 - параметр
     */
    navAction(action) {
      switch (action[0]) {
        // Изменяет размер экрана
        case 'size':
          this.updateWindowSize(action)
          break
      }
    },

    /**
     * Изменяет размер экрана
     */
    updateWindowSize(size) {
      const windowSize = new Map([
        ['xs', 320],
        ['sm', 576],
        ['md', 768],
        ['lg', 992],
        ['xl', 1200],
        ['xxl', 1400]
      ])

      this.$store.commit(
        'siteConstructor/page/options/SET_WIDTH',
        windowSize.get(size[1])
      )
    }
  }
}
</script>
