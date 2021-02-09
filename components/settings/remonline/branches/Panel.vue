<template>
  <div class="row">
    <div class="col-12">
      <el-button
        @click="fetchBranches"
        size="mini"
        type="success"
        icon="el-icon-refresh"
        title="Добавить бренд"
      >
        Загрузить/обновить список филлиалов
      </el-button>
    </div>
    <div class="col-12 mt-30">
      <ul class="branchList">
        <li
          v-for="(item, idx) in $store.getters['report/branch/branches']"
          :key="idx"
        >
          <el-button
            @click="editItem(item)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
          />
          {{ item.name }}
        </li>
      </ul>
    </div>
    <app-window-update :item="selectItem" @edit="onEdit" />
  </div>
</template>

<script>
import AppWindowUpdate from '~/components/settings/remonline/branches/window/Update.vue'
import Rem from '~/utils/remonline.js'

export default {
  components: {
    AppWindowUpdate
  },
  data() {
    return {
      loading: false,
      selectItem: {}
    }
  },
  mounted() {
    if (this.$store.getters['report/branch/branches'].length === 0) {
      this.$store.dispatch('report/branch/fetchItems')
    }
  },
  methods: {
    /**
     * Обновление списка из ремонлайна
     */
    async fetchBranches() {
      this.loading = true
      try {
        const rem = new Rem(process.env.REMONLINE_API_KEY, true)
        const res = await rem.getBranches()
        const branches = this.$store.getters['report/branch/branches']

        // расхождения в массивах
        // eslint-disable-next-line
        // const difference = branches.filter((el) => !res.data.includes(+el.branch_id))

        for (const branch of res.data) {
          const item = branches.find((el) => +el.branch_id === branch.id)
          const fd = {
            name: branch.name,
            branch_id: branch.id
          }
          if (item) {
            // eslint-disable-next-line
            await this.$axios.put(
              `/api/v1/report/branch/update/${item._id}`,
              fd
            )
          } else {
            await this.$axios.post('/api/v1/report/branch/create', fd)
          }
        }

        this.$store.dispatch('report/branch/fetchItems')
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },

    /**
     * Окно редактирование элемента
     */
    editItem(item) {
      this.selectItem = item
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportBranchUpdate',
        status: true
      })
    },

    /**
     * Если редактирование прошло успешно
     */
    async onEdit() {
      await this.$store.dispatch('report/branch/fetchItems')
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerReportBranchUpdate',
        status: false
      })
    }
  }
}
</script>

<style>
.branchList {
  margin-bottom: 0;
  padding: 0;
}
.branchList li {
  list-style: none;
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
