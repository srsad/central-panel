<template>
  <div
    :class="[
      'category',
      $store.state.source.page.categoryName === item.pagetitle ? 'active' : ''
    ]"
  >
    <div
      v-if="item.tv_imgCategiry !== ''"
      :style="
        `
        background: url(https://${$store.state.source.page.params.source}${item.tv_imgCategiry}) 50% 50% / contain no-repeat;
      `
      "
      class="category__img"
    />
    <div class="category__text">
      {{ item.pagetitle }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
