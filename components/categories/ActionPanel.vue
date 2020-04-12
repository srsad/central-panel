<template>
  <div class="text-center pt-50">
    <template v-if="$store.state.source.page.categoryName">
      <transition name="slide-fade">
        <div v-if="$store.state.source.page.partsCategory.length > 0">
          <el-button
            @click="showDetails"
            title="Детали раздела"
            icon="el-icon-s-tools"
            type="primary"
            size="medium"
            plain
            style="padding:5px;width:40px;height:40px"
          />
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="mt-10">
          <el-button
            @click="onCreate"
            title="Добавить деталь"
            icon="el-icon-plus"
            type="success"
            size="medium"
            plain
            style="padding:5px;width:40px;height:40px"
          />
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  methods: {
    showDetails() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerPartList',
        status: true
      })
    },
    onCreate() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreatePartItem',
        status: true
      })
    }
  }
}
</script>
