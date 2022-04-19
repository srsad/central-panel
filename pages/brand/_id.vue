<template>
  <div class="row">
    <div class="col-12">
      <h1>{{ brand.name }}</h1>
    </div>

    <div class="col-12 mb-15">
      <el-button @click="openModal" type="success" size="mini">
        Добавить категорию
      </el-button>
    </div>
    <div class="col-12">
      <!-- каталог категорий -->
      <app-categories-list :brand="brand" />
    </div>

    <div class="col-11">
      <!-- каталог устройств -->
      <app-device-list />
    </div>

    <div class="col-1">
      <!-- Управение выбранным каталогом -->
      <app-categories-service />
    </div>

    <app-create-category-window />
    <app-update-category-window />
  </div>
</template>

<script>
import AppCategoriesList from '~/components/callcenter/category/List'
import AppDeviceList from '~/components/callcenter/device/List'
import AppCategoriesService from '~/components/callcenter/category/Service'
import AppCreateCategoryWindow from '~/components/callcenter/category/window/Create'
import AppUpdateCategoryWindow from '~/components/callcenter/category/window/Update'

export default {
  name: 'BrandPage',

  components: {
    AppCategoriesList,
    AppDeviceList,
    AppCreateCategoryWindow,
    AppUpdateCategoryWindow,
    AppCategoriesService
  },

  async validate({ params, store }) {
    // отчищаем все категории
    store.commit('repair/brand/SET_BRAND', null)
    let res = false
    try {
      // загрузка данных страницы
      const page = await store.dispatch('repair/brand/fetchById', params.id)
      store.dispatch('settings/setBreadcrumbs', [
        {
          uri: '/brand/' + page._id,
          label: page.name
        }
      ])
      if (page) res = true // false => 404
    } catch (e) {
      //
    }
    return res
  },

  computed: {
    brand() {
      return this.$store.state.repair.brand.brand
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('repair/category/fetchItemsById', params.id)
  },

  methods: {
    openModal(modalName) {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowCreateCategory',
        status: true
      })
    }
  }
}
</script>
