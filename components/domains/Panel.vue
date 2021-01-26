<template>
  <div>
    <!--  -->
    <el-tabs value="mainPanel">
      <el-tab-pane label="Все домены" name="mainPanel">
        <app-list
          :items="domains"
          :loading="loading"
          @edit="edit"
          @remove="remove"
          @switchStatus="switchStatus"
        />
      </el-tab-pane>
      <el-tab-pane
        :lazy="true"
        label="СПБ 2-я Красноармейская"
        name="spb_26047"
      >
        <app-list
          :items="domains"
          :loading="loading"
          @edit="edit"
          @remove="remove"
          @switchStatus="switchStatus"
          dcod="01"
        />
      </el-tab-pane>
      <el-tab-pane label="СПБ Дмитровский" name="spb_33038">
        <app-list
          :items="domains"
          :loading="loading"
          @edit="edit"
          @remove="remove"
          @switchStatus="switchStatus"
          dcod="02"
        />
      </el-tab-pane>
      <el-tab-pane label="МСК Новослободская" name="msk_63323">
        <app-list
          :items="domains"
          :loading="loading"
          @edit="edit"
          @remove="remove"
          @switchStatus="switchStatus"
          dcod="03"
        />
      </el-tab-pane>
      <el-tab-pane label="МСК Сеславинская" name="msk_72021">
        <app-list
          :items="domains"
          :loading="loading"
          @edit="edit"
          @remove="remove"
          @switchStatus="switchStatus"
          dcod="04"
        />
      </el-tab-pane>
    </el-tabs>

    <!--  -->
    <app-drawer-create />
    <app-drawer-update />
  </div>
</template>

<script>
import AppDrawerCreate from '~/components/domains/DrawerCreate'
import AppDrawerUpdate from '~/components/domains/DrawerUpdate'
import AppList from '~/components/domains/List'

export default {
  components: {
    AppDrawerCreate,
    AppDrawerUpdate,
    AppList
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    domains() {
      return JSON.parse(JSON.stringify(this.$store.getters['domains/domains']))
    }
  },
  methods: {
    /**
     * Удаление домена
     */
    async remove({ idx, item }) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/domain/remove/' + item._id)
        this.$store.dispatch('domains/fetchDomains')
        this.$notify({
          message: 'Домемн успушно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        throw e
      } finally {
        this.loading = false
      }
    },

    /**
     * Обновление домена
     */
    edit(item) {
      if (this.loading === true) return
      if (!this.$abilities('domains-update')) return
      this.$store.commit('domains/SET_DOMAIN', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateDomains',
        status: true
      })
    },

    /**
     * Смена статуса
     */
    async switchStatus(item) {
      this.loading = true
      try {
        const formData = JSON.parse(JSON.stringify(item))
        formData.status = !formData.status
        await this.$store.dispatch('domains/updateDomain', formData)
        this.$notify({
          message: 'Данные обновлены!',
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
