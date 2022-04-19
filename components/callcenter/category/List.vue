<template>
  <div class="row">
    <app-category-item
      v-for="category in categories"
      :key="category._id"
      :item="category"
      :loading="loading"
      @select="onSelect"
      @remove="onRemove"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import AppCategoryItem from './CategoryItem'

export default {
  name: 'CategoryList',

  components: {
    AppCategoryItem
  },

  props: {
    brand: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    categories() {
      return this.$store.state.repair.category.categories
    }
  },

  methods: {
    async onRemove(item) {
      this.loading = true

      try {
        await this.$axios.$delete('/api/v1/repair/category/remove/' + item._id)
        this.$notify({
          message: 'Категория успушно удаленна!',
          customClass: 'success-notyfy'
        })
        this.$store.dispatch('repair/category/fetchItemsById', this.brand._id)
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        console.error('Не удалось удалить категорию', e.response)
      } finally {
        this.loading = false
      }
    },

    onEdit(item) {
      this.$store.commit('repair/category/SET_CATEGORY', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowUpdateCategory',
        status: true
      })
    },

    onSelect(item) {
      this.$store.commit('repair/category/SET_SELECT_CATEGORY', item)
      // загружаем список моделей
    }
  }
}
</script>
