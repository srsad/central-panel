<template>
  <div>
    <div>
      <el-button
        @click="create"
        type="success"
        size="mini"
        icon="el-icon-plus"
        class="mb-10"
      >
        Создать
      </el-button>
    </div>
    <app-list :loading="loading" @onEdit="edit" @onRemove="remove" />
    <app-window-create />
    <app-window-update />
  </div>
</template>

<script>
import AppList from '~/components/constructor/site/List'
import AppWindowCreate from '~/components/constructor/site/WindowCreate'
import AppWindowUpdate from '~/components/constructor/site/WindowUpdate'

export default {
  components: {
    AppList,
    AppWindowCreate,
    AppWindowUpdate
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    /**
     * Создание нового сайта
     */
    create() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowConstructorSiteCreate',
        status: true
      })
    },

    /**
     * Редактирование данных сайта
     */
    edit(item) {
      this.$store.commit('siteConstructor/sites/SET_SITE', item)
      // -
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowConstructorSiteUpdate',
        status: true
      })
    },

    /**
     * Удаление домена
     */
    async remove(item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/constructor/site/remove/' + item._id)
        await this.$store.dispatch('siteConstructor/sites/fetchItems')
        this.$notify({
          message: 'Элемент успушно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        throw e
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
