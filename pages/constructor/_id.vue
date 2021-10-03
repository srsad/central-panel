<template>
  <div class="bodyPage">
    <div :style="{ width: windowWidth + 'px' }">
      <div>asdasdasd</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'constructorLayout',
  computed: {
    windowWidth() {
      return this.$store.getters['siteConstructor/page/options/width']
    }
  },
  async validate({ params, query, store }) {
    // console.log('ctx', params, query)
    const res = await store.dispatch(
      'siteConstructor/sites/checkSite',
      params.id
    )
    return res?.name
  }
}
</script>

<style lang="sass">
.bodyPage
  max-width: 100%
  overflow: auto
  & > div
    display: block
    margin: 0 auto
    border: 1px dashed slategrey
</style>
