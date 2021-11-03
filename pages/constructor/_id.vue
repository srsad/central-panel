<template>
  <div class="bodyPage">
    <draggable
      @start="dragging = true"
      @end="dragging = false"
      draggable=".section"
    >
      <div :style="{ width: windowWidth + 'px' }" class="section">
        <section v-for="(section, idx) in sections" :key="idx">
          555 {{ idx }}
        </section>
      </div>
    </draggable>
    <!--  -->
    <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div
        class="list-group-item"
        v-for="(section, idx) in sections"
        :key="idx"
      >
        {{ section.id }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  layout: 'constructorLayout',
  components: {
    draggable
  },
  data() {
    return {
      dragging: false, // событие перетаскивания секции
      sections: [
        {
          id: 's0001',
          index: 0,
          content: '<h1>sdfsdf 1</h1>'
        },
        {
          id: 's0002',
          index: 1,
          content: '<h1>sdfsdf 2</h1>'
        },
        {
          id: 's0003',
          index: 2,
          content: '<h1>sdfsdf 3</h1>'
        }
      ]
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters['siteConstructor/page/options/width']
    }
  },
  async validate({ params, query, store }) {
    // console.log('ctx', params, query)
    const res = await store.dispatch(
      'siteConstructor/sites/checkSite',
      params.id
    )
    return res?.name
  },
  methods: {
    onDragStart(data) {
      console.log('onDragStart', data)
    },
    checkMove(params) {
      console.log('checkMove')
    }
  }
}
</script>

<style lang="sass">
.bodyPage
  max-width: 100%
  overflow: auto
  & > div
    display: block
    margin: 0 auto
    border: 1px dashed slategrey
</style>
