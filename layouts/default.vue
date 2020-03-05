<template>
  <div>
    <navbar />
    <nuxt />
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
