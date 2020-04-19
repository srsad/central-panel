<template>
  <div class="text-center pt-50">
    <template v-if="$store.state.source.page.categoryName">
      <transition v-if="$abilities('part-read')" name="slide-fade">
        <div v-if="$store.state.source.page.partsCategory.length > 0">
          <el-button
            @click="showDrawer('drawerPartList')"
            title="Детали раздела"
            icon="el-icon-s-tools"
            type="primary"
            size="medium"
            plain
            style="padding:5px;width:40px;height:40px"
          />
        </div>
      </transition>
      <transition v-if="$abilities('part-create')" name="slide-fade">
        <div class="mt-10">
          <el-button
            @click="showDrawer('drawerCreatePartItem')"
            title="Добавить деталь"
            icon="el-icon-plus"
            type="success"
            size="medium"
            plain
            style="padding:5px;width:40px;height:40px"
          />
        </div>
      </transition>
      <transition
        v-if="
          $abilities('device-create') &&
            this.$store.getters['source/page/deviceList'].length > 0
        "
        name="slide-fade"
      >
        <div class="mt-10">
          <el-button
            @click="showDrawer('drawerAddDevice')"
            title="Добавление устройство"
            icon="el-icon-mobile-phone"
            type="info"
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
    showDrawer(drawer) {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: drawer,
        status: true
      })
    }
  }
}
</script>
