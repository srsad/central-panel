<template>
  <div>
    <el-row type="flex">
      <div>
        <navbar />
      </div>
      <div>
        <nuxt />
      </div>
    </el-row>
  </div>
</template>

<script>
import Navbar from '~/components/common/Navbar'

export default {
  // midleware: ['auth']
  components: {
    Navbar
  }
}
</script>
