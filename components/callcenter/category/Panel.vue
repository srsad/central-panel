<template>
  <div>
    <!--  -->
    <app-create-category-window />
  </div>
</template>

<script>
import AppCreateCategoryWindow from '~/components/callcenter/category/window/Create'

export default {
  name: 'CategoryPanel',

  components: {
    AppCreateCategoryWindow
  }
}
</script>
