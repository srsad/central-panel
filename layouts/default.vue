<template>
  <div class="container-fluid">
    <div
      :class="['main-container', !$store.state.settings.isCollapse || 'close']"
    >
      <div v-if="$store.getters['auth/access'].includes('sidebar')">
        <app-sidebar />
      </div>
      <div class="" style="position: relative">
        <el-header class="main-header">
          <div class="col-1">
            <n-link to="/" class="logo">Service</n-link>
          </div>
          <div class="col-lg-7 align-items-center"><app-breadcrumb /></div>
          <div class="col-lg-2 text-right"><app-main-search /></div>
          <div class="col-lg-2 text-right"><app-navbar /></div>
        </el-header>
        <div class="m-15 mt-70">
          <nuxt />
        </div>
      </div>
    </div>
    <!--  -->
    <app-back-to-top />
  </div>
</template>

<script>
import AppSidebar from '~/components/common/Sidebar'
import AppNavbar from '~/components/common/Navbar'
import AppBreadcrumb from '~/components/common/Breadcrumb'
import AppMainSearch from '~/components/common/MainSearch'
import AppBackToTop from '~/components/common/BackToTop'

export default {
  middleware: ['auth'],
  components: {
    AppSidebar,
    AppNavbar,
    AppBreadcrumb,
    AppMainSearch,
    AppBackToTop
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    async error(value) {
      if (value === null) return
      await this.$notify({
        title: 'Ошибка',
        message: value,
        customClass: 'error-notyfy'
      })
      this.$store.commit('CLEAR_ERROR')
    }
  }
}
</script>

<style>
.main-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  margin: 0 -15px;
  transition: all 0.2s;
}
.main-container.close {
  grid-template-columns: 64px 1fr;
  transition: all 0.2s;
}
.main-container:not(.close) {
  grid-template-columns: 200px 1fr;
}
</style>
