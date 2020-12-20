<template>
  <div>{{ value }} %</div>
</template>

<script>
export default {
  data() {
    return {
      hotInstance: null,
      TD: null,
      row: null,
      col: null,
      prop: null,
      value: null,
      cellProperties: null
    }
  },
  mounted() {
    // console.log('hotInstance', this.hotInstance)
    // console.log('TD', this.TD)
    // console.log('row', this.row)
    // console.log('col', this.col)
    // console.log('prop', this.prop)
    // console.log('value', this.value)
    console.log('cellProperties', this.cellProperties)
    // console.log('cellProperties', this.cellProperties.instance.getData())
    // console.log('---------------------------------------------')
  }
}
</script>
