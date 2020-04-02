<template>
  <div class="row">
    <div v-if="page.brand" class="col-12">
      <h1>{{ page.brand }} - {{ page.company }}</h1>
    </div>

    <!-- список категорий -->
    <div
      v-for="(item, idx) in categories"
      :key="idx"
      @click="loadDeviceList(item)"
      class="col-sm-6 col-lg-4 col-xl-3 mb-20"
    >
      <app-category-item :item="item" />
    </div>
    <!--  -->
    <div
      v-loading="!loadContent"
      v-if="!loadContent"
      class="mt-100 col-12 d-none"
      element-loading-text="Загрузка..."
      element-loading-spinner="el-icon-loading"
    />
    <div class="col-12">
      <h3>{{ $store.state.source.page.categoryName }}</h3>
    </div>
    <!-- deviceList -->
    <div
      v-if="$store.getters['source/page/deviceList'].length > 0"
      class="col-12"
    >
      <app-device-grid />
    </div>
    <!-- end deviceList -->
    <!-- fastPrice -->
    <div
      v-if="$store.getters['source/page/fastPrice'].length > 0"
      class="col-12"
    >
      <app-fast-price />
    </div>
    <!-- end fastPrice -->
  </div>
</template>

<script>
import AppCategoryItem from '~/components/sourceSite/CategoryItem'
import AppDeviceGrid from '~/components/sourceSite/DeviceGrid'
import AppFastPrice from '~/components/sourceSite/FastPrice'

export default {
  components: {
    AppCategoryItem,
    AppDeviceGrid,
    AppFastPrice
  },
  async validate({ params, store }) {
    // отчищаем все категории
    store.dispatch('source/page/clearAllParams')
    let res = false
    try {
      await store.dispatch('source/page/getPage', params.id)
      const page = await store.getters['source/page/params']
      if (page) res = true
    } catch (e) {
      //
    }
    return res
  },
  data() {
    return {
      loadContent: false,
      showLoader: false
    }
  },
  computed: {
    page() {
      return this.$store.getters['source/page/params']
    },
    categories() {
      return this.$store.getters['source/page/categories']
    }
  },
  methods: {
    loadDeviceList(item) {
      this.$store.dispatch('source/page/setCategoryName', item.pagetitle)
      this.$store.dispatch('source/page/getDeviceList', {
        siteUrl: this.page.source,
        id: item.id
      })
    }
  }
}
</script>
