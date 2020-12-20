<template>
  <div>{{ value }} ₽</div>
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
  }
}
</script>
