<template>
  <!-- eslint-disable no-irregular-whitespace -->
  <div class="row">
    <div class="col-12">
      <el-button
        @click="openModalCreate"
        type="success"
        size="medium"
        class="mb-15"
      >
        Создать коллекцию неисправностей
      </el-button>
    </div>
    <!--  -->
    <template v-for="(collection, index) in malfunctions">
      <div
        v-if="$abilities('malf-rservice_panel-hide')"
        :key="index"
        class="col-6 col-lg-4 mb-30"
      >
        <table
          :class="{ 'hide-malfunction': collection.hide }"
          class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
        >
          <tbody>
            <tr>
              <td colspan="5">{{ collection.name }}</td>
              <td>
                <el-button
                  @click="openModalUpdate(collection)"
                  title="Редактиоравть коллекцию"
                  type="success"
                  size="mini"
                  icon="el-icon-edit"
                />

                <el-popconfirm
                  @onConfirm="removeMalfuntion(collection._id)"
                  title="Удалить категорию?"
                  confirm-button-text="Да"
                  confirm-button-type="success"
                  cancel-button-type="default"
                  cancel-button-text="Нет, спасибо"
                >
                  <el-button
                    slot="reference"
                    :loading="loading"
                    title="Удалить коллекцию"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                  />
                </el-popconfirm>
              </td>
            </tr>
            <tr
              v-for="(malfunction, idx) in collection.malfunctions"
              :key="idx"
            >
              <td
                colspan="4"
                style="text-align: left; padding-left: 10px; min-width: 290px"
              >
                {{ malfunction.name }}
              </td>
              <td>от {{ malfunction.price }} р.</td>
              <td>от {{ malfunction.time || 30 }} мин.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: 'MalfunctionPanel',

  data() {
    return {
      loading: false
    }
  },

  computed: {
    malfunctions() {
      return this.$store.state.repair.malfunction.malfunctions
    }
  },

  methods: {
    openModalCreate() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowCreateMalfunction',
        status: true
      })
    },

    openModalUpdate(collectionItem) {
      this.$store.commit('repair/malfunction/SET_MALFUNCTION', collectionItem)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowUpdateMalfunction',
        status: true
      })
    },

    /**
     * -
     */
    async removeMalfuntion(collectionId) {
      this.loading = true
      try {
        await this.$axios.$delete(
          '/api/v1/repair/malfunction/remove/' + collectionId
        )
        this.$store.dispatch('repair/malfunction/fetchItems')
        await this.$notify({
          message: 'Коллекция успушно удалена!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        console.error('Неудалосьудалить коллекцию неисправностей', e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
tbody td {
  text-align: center;
  font-size: 12px;
}
td[colspan='5'] {
  font-size: 20px;
}

.hide-malfunction {
  box-shadow: 0px 0px 0px 1px #ff9800;
}
</style>
