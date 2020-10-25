<template>
  <div class="row w100 mt-15">
    <div class="col-12 mt-10 mb-10">
      <h3>Отзывы</h3>
    </div>
    <div class="col-12">
      <app-testimonial-panel v-if="$abilities('sites-testimonial')" />
    </div>
  </div>
</template>

<script>
import AppTestimonialPanel from '~/components/site/testimonial/Panel'

export default {
  components: {
    AppTestimonialPanel
  },
  async fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/testimonials',
        label: 'Отзывы'
      }
    ])
    try {
      // загрузка списка сайтов с отзывами
      if (store.getters['site/testimonial/sites'].length === 0) {
        await store.dispatch('site/testimonial/fetchSites')
      }
    } catch (e) {
      error(e)
    }
  }
}
</script>
