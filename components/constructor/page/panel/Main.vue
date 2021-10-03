<template>
  <div class="mainPanel">
    <el-button-group>
      <el-button size="mini" @click="selectSection('drawerSectionTop')">
        Топ
      </el-button>
      <el-button size="mini" @click="selectSection('drawerSectionMenu')">
        Меню
      </el-button>
      <el-button size="mini" @click="selectSection('drawerSectionCover')">
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
