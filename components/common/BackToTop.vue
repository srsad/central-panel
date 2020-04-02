<template>
  <div :class="['backToTop', active ? 'active' : '']">
    <el-button @click="toTop" icon="el-icon-arrow-up" title="Вверх" circle />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (pageYOffset >= 900 && !this.active) {
        this.active = true
      } else if (pageYOffset < 900 && this.active) {
        this.active = false
      }
    })
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="sass">
.backToTop
  position: fixed
  bottom: 65px
  right: 45px
  transform: scale(0)
  transition: all .2s
  &.active
    transform: scale(1.5)
</style>
