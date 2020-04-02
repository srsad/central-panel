<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      @select="handleSelect"
      size="mini"
      placeholder="Поиск брендов"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [],
      state: ''
    }
  },
  mounted() {
    this.loadAll()
  },
  methods: {
    async loadAll() {
      if (this.$store.getters['source/control/sources'].length === 0) {
        await this.$store.dispatch('source/control/fetchItems')
      }
      this.links = this.$store.getters['source/control/sourceSearchList']
    },
    querySearchAsync(queryString, cb) {
      const links = this.links
      const results = queryString
        ? links.filter(this.createFilter(queryString))
        : links
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(item) {
      this.$router.push(item.link)
      this.state = ''
    }
  }
}
</script>
