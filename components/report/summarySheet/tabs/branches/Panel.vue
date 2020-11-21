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
      <ol class="mb-0" style="padding: 0px 20px">
        <li
          v-for="(item, idx) in $store.getters['report/branch/branches']"
          :key="idx"
          class="mt-15 mb-5"
        >
          {{ item.name }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Rem from '~/utils/remonline.js'

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
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
            await this.$axios.put(`/api/v1/report/branch/update/${item._id}`, fd)
          } else {
            await this.$axios.post('/api/v1/report/branch/create', fd)
          }
        }

        this.$store.dispatch('report/branch/fetchItems')
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    }
  },
  mounted() {
    if (this.$store.getters['report/branch/branches'].length === 0) {
      this.$store.dispatch('report/branch/fetchItems')
    }
  }
}
</script>
