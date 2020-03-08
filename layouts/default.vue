<template>
  <div class="container-fluid">
    <div class="row">
      <div>
        <app-sidebar />
      </div>
      <div class="col prl-0" style="width:50%">
        <el-header class="main-header">
          <div class="row prl-0">
            <div class="col-1">
              <n-link to="/">
                logo
              </n-link>
            </div>
            <div class="col-lg-7 align-items-center"><app-breadcrumb /></div>
            <div class="col-lg-2 text-right"><app-main-search /></div>
            <div class="col-lg-2 text-right"><app-navbar /></div>
          </div>
        </el-header>
        <div class="m-15">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '~/components/common/Sidebar'
import AppNavbar from '~/components/common/Navbar'
import AppBreadcrumb from '~/components/common/Breadcrumb'
import AppMainSearch from '~/components/common/MainSearch'

export default {
  // midleware: ['auth']
  components: {
    AppSidebar,
    AppNavbar,
    AppBreadcrumb,
    AppMainSearch
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
