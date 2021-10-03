<template>
  <div class="bodyPage">
    <div :style="{ width: windowWidth + 'px' }">
      <div v-for="idx in 35" :key="idx">asdasdasd {{ idx }}</div>
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
  validate({ params, query, store }) {
    // let res = false
    // try {
    //   // загрузка данных страницы
    //   await store.dispatch('source/page/getPage', params.id)
    //   const page = await store.getters['source/page/params']
    //   // store.dispatch('settings/setBreadcrumbs', [
    //   //   {
    //   //     uri: '/company/' + page._id,
    //   //     label: page.brand + ' - ' + page.company
    //   //   }
    //   // ])
    //   if (page) res = true // false => 404
    // } catch (e) {}
    console.log('ctx', params, query)
    // return res
    return true
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
