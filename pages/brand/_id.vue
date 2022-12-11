<template>
  <div class="row">
    <div class="col-12">
      <h1>{{ brand.name }}</h1>
    </div>

    <div class="col-12 mb-15">
      <el-button
        v-if="$abilities('category-create')"
        @click="openModal('windowCreateCategory')"
        type="success"
        size="mini"
      >
        Добавить категорию
      </el-button>
    </div>
    <div class="col-12">
      <!-- каталог категорий -->
      <app-categories-list :brand="brand" />
    </div>

    <div v-if="selectCategory" class="col-12 mb-15">
      <h3>{{ selectCategory }}</h3>
    </div>

    <div class="col-11">
      <!-- каталог устройств или быстрый прайс -->
      <app-device-list :category="category" />
    </div>

    <div class="col-1">
      <!-- Управение выбранным каталогом -->
      <app-categories-service />
    </div>

    <!-- окно неисправностей устройства -->
    <app-device-malfunctions-list-window />

    <!-- окно добавления детали -->
    <app-part-create-window />
    <!-- окно обновления детали -->
    <app-part-update-window />

    <!-- окно списка деталей -->
    <app-part-list-window />

    <app-create-category-window />
    <app-update-category-window />

    <app-create-device-window />
  </div>
</template>

<script>
import AppCategoriesList from '~/components/callcenter/category/List'
import AppDeviceList from '~/components/callcenter/device/List'
import AppCategoriesService from '~/components/callcenter/category/Service'
import AppCreateCategoryWindow from '~/components/callcenter/category/window/Create'
import AppUpdateCategoryWindow from '~/components/callcenter/category/window/Update'
import AppCreateDeviceWindow from '~/components/callcenter/device/window/Create'
import AppDeviceMalfunctionsListWindow from '~/components/callcenter/device/window/DeviceMalfunctionsList'
import AppPartCreateWindow from '~/components/callcenter/part/window/Create'
import AppPartUpdateWindow from '~/components/callcenter/part/window/Update'
import AppPartListWindow from '~/components/callcenter/part/window/List'

export default {
  name: 'BrandPage',

  components: {
    AppCategoriesList,
    AppDeviceList,
    AppCreateCategoryWindow,
    AppUpdateCategoryWindow,
    AppCategoriesService,
    AppCreateDeviceWindow,
    AppDeviceMalfunctionsListWindow,
    AppPartCreateWindow,
    AppPartUpdateWindow,
    AppPartListWindow
  },

  async validate({ params, store }) {
    // отчищаем все категории
    store.commit('repair/brand/SET_BRAND', null)
    store.commit('repair/device/SET_DEVICES', [])
    store.commit('repair/category/SET_SELECT_CATEGORY', null)

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
    },

    category() {
      return this.$store.state.repair.category.selectCategory
    },

    selectCategory() {
      return this.category?.name
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('repair/category/fetchItemsById', params.id)
  },

  created() {
    // this.$store.commit('repair/malfunction/SET_MALFUNCTION', [])
    // this.$store.commit('repair/brand/SET_DEVICES', [])
    // загрузка списка не для записи
    this.$store.dispatch('recording/fetchNotRecordingDevice')
  },

  methods: {
    openModal(modalName) {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: modalName,
        status: true
      })
    }
  }
}
</script>
