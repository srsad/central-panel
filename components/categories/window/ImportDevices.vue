<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowImportDevice"
    :before-close="onClose"
    @open="onOpen"
    title="Импорт устройств"
  >
    <el-form :disabled="loading">
      <el-form-item>
        <el-select v-model="selectCategory" filterable placeholder="Категория">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onImport" :loading="loading">
          Импорт
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'ImportDevices',

  data() {
    return {
      loading: false,
      selectCategory: '',
      categories: []
    }
  },

  methods: {
    async onOpen() {
      // активный бренд
      const selectBrand = this.$store.state.source.page.params.name
      // список устройств
      console.log(this.$store.state.source.page.deviceList)
      // список категорий бренда
      if (!this.$store.state.repair.brand.brands.length) {
        await this.$store.dispatch('repair/brand/fetchItems')
      }

      const brands = this.$store.state.repair.brand.brands
      const selectBrandParams = brands.find(
        (el) => el.name.toLowerCase() === selectBrand.toLowerCase()
      )

      if (selectBrandParams?._id) {
        this.categories = await this.$store.dispatch(
          'repair/category/fetchItemsById',
          selectBrandParams._id
        )
      }
    },

    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowImportDevice',
        status: false
      })
    },

    async onImport() {
      let i = 1
      for (const device of this.$store.state.source.page.deviceList) {
        try {
          await this.$store.dispatch('repair/device/create', {
            name: device.pagetitle,
            series: device.tv_filterPhone,
            category_id: this.selectCategory
          })
          console.log(
            'Устройство',
            `${i}/${this.$store.state.source.page.deviceList.length}`,
            device.pagetitle,
            'загруженно'
          )
        } catch (error) {
          this.$store.commit('SET_ERROR', 'Не удалось создать устройство')
        }
        i++
      }
    }
  }
}
</script>
