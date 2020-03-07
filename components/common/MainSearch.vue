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
      state: '',
      timeout: null
    }
  },
  mounted() {
    this.links = this.loadAll()
  },
  methods: {
    loadAll() {
      return [
        { value: 'Apple Impuls', link: 'https://github.com/vuejs/vue' },
        { value: 'Apple Rservice', link: 'https://github.com/ElemeFE/element' },
        { value: 'Nokia Impuls', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'Nokia Rservice', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'Nicon Impuls', link: 'https://github.com/vuejs/vuex' },
        { value: 'Nicon Rservice', link: 'https://github.com/vuejs' },
        { value: 'Other  Impuls', link: 'https://github.com/babel/babel' }
      ]
    },
    querySearchAsync(queryString, cb) {
      const links = this.links
      const results = queryString
        ? links.filter(this.createFilter(queryString))
        : links

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleSelect(item) {
      // eslint-disable-next-line no-console
      console.log('search handleSelect', item)
    }
  }
}
</script>
