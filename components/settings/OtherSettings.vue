<template>
  <div>
    <div class="form-group">
      <el-button
        @click="onUpdateCategoryList"
        :loading="loading"
        type="success"
        icon="el-icon-s-order"
      >
        Обновить список категорий
      </el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onUpdateCategoryList() {
      this.loading = true
      // проверяем сипсок источников из стора
      if (this.$store.getters['source/control/sources'].length === 0) {
        await this.$store.dispatch('source/control/fetchItems')
      }
      const sources = this.$store.getters['source/control/sources']
      // проходимся по каждому источнику, достаем его категории и обновляем туществующие
      for (const el of sources) {
        const categories = await this.$axios.$get(`https://${el.source}/rest/?get=slist`)
        const formData = new FormData()
        formData.append('categories', JSON.stringify(categories))
        await this.$axios.$post('/api/v1/source-site/update/' + el._id, formData)
      }
      await this.$store.dispatch('source/control/fetchItems')
      this.$notify({
        message: 'Список категорий успушно обновлен!',
        customClass: 'success-notyfy'
      })
    }
  }
}
</script>
