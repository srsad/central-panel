<template>
  <div class="mainPanel">
    <el-button-group>
      <el-button @click="selectSection('drawerSectionTop')" size="mini">
        Топ
      </el-button>
      <el-button @click="selectSection('drawerSectionMenu')" size="mini">
        Меню
      </el-button>
      <el-button @click="selectSection('drawerSectionCover')" size="mini">
        Обложка
      </el-button>
      <!-- <el-button size="mini" @click="selectSection('about')">
        О проекте
      </el-button>
      <el-button size="mini" @click="selectSection('benefits')">
        Преимущества
      </el-button> -->
    </el-button-group>
    <p class="text-center">
      Выберите секцию
    </p>
  </div>
</template>

<script>
/**
 * Блок выбора встраевоемой секции на странице конструктора
 */

export default {
  methods: {
    /**
     * Выбор секции
     * @param {String} section - выбранный блок секций
     */
    selectSection(section) {
      this.$store.commit('siteConstructor/page/options/SWITCH_DRAWNER', {
        dranwer: section,
        status: true
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.mainPanel
  & > div
    display: block
    max-width: 200px
    margin: 15px auto
</style>
