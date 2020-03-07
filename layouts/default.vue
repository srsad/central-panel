<template>
  <el-row type="flex">
    <el-aside style="width:auto">
      <sidebar />
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <div class="row">
          <div class="col-lg-10"><breadcrumb /></div>
          <div class="col-lg-10"><navbar /></div>
        </div>
      </el-header>
      <div class="m-15">
        <nuxt />
      </div>
    </el-container>
  </el-row>
</template>

<script>
import Sidebar from '~/components/common/Sidebar'
import Navbar from '~/components/common/Navbar'
import Breadcrumb from '~/components/common/Breadcrumb'

export default {
  // midleware: ['auth']
  components: {
    Sidebar,
    Navbar,
    Breadcrumb
  }
}
</script>
