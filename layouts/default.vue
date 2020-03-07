<template>
  <el-row type="flex">
    <el-aside style="width:auto">
      <sidebar />
    </el-aside>
    <el-container>
      <el-header class="main-header">
        <el-row type="flex" class="w100">
          <el-col :span="18" class="align-items-center">
            <breadcrumb />
          </el-col>
          <el-col :span="6" class="text-right">
            <navbar />
          </el-col>
        </el-row>
      </el-header>
      <el-row type="flex" class="w100">
        <el-col :span="24">
          <nuxt />
        </el-col>
      </el-row>
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
