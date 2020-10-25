<template>
  <div class="row w100 mt-15">
    <div class="col-12 mt-10 mb-10">
      <h3>Настройки сатй</h3>
    </div>
    <div class="col-12">
      <n-link
        v-if="$abilities('sites-testimonial')"
        to="/sites/testimonials"
        class="el-button el-button--primary el-button--mini"
      >
        Отзывы
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/sites',
        label: 'Настнойки сайта'
      }
    ])
  }
}
</script>
