<template>
  <div class="row w100 mt-15">
    <div class="col-12 mb-15">
      <el-button @click="openModal" type="success" size="mini">
        Добавить бренд
      </el-button>
    </div>
    <div class="col-12">
      <div class="row">
        <app-brand-item
          v-for="element in brands"
          :key="element._id"
          :item="element"
          :loading="loading"
          @remove="onRemove"
          @edit="onEdit"
        />
      </div>
    </div>
    <app-create-brand-window />
    <app-update-brand-window />
  </div>
</template>

<script>
import AppBrandItem from '~/components/callcenter/brand/BrandItem'
import AppCreateBrandWindow from '~/components/callcenter/brand/window/Create'
import AppUpdateBrandWindow from '~/components/callcenter/brand/window/Update'

export default {
  name: 'BrandPanel',

  components: {
    AppBrandItem,
    AppCreateBrandWindow,
    AppUpdateBrandWindow
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    brands() {
      return this.$store.state.repair.brand.brands
    }
  },

  mounted() {
    if (!this.brands.length) {
      this.$store.dispatch('repair/brand/fetchItems')
    }
  },

  methods: {
    /**
     * Открытие модального окна создания бренда
     */
    openModal() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowCreateBrand',
        status: true
      })
    },

    /**
     * Открытие модального окна редактирование бренда
     */
    onEdit(item) {
      this.$store.commit('repair/brand/SET_SELECT_BRAND', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowUpdateBrand',
        status: true
      })
    },

    /**
     * Удаление бренда
     * @param {Object} - объект для удаления
     */
    async onRemove(item) {
      this.loading = true
      try {
        await this.$axios.delete('/api/v1/repair/brand/remove/' + item._id)
        await this.$notify({
          message: 'Бренд успушно удален!',
          customClass: 'success-notyfy'
        })
        await this.$store.dispatch('repair/brand/fetchItems')
      } catch (error) {
        console.error('Не удалось удалить бренд', error)
        this.$store.commit('SET_ERROR', 'Не удалось удалить бренд')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
