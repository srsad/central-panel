<template>
  <div class="row">
    <div class="col-6 text-center">
      <button class="mb-20" style="padding:0;cursor:default">
        <img src="/site/images/rserv.jpg" alt="Rservice" style="height:90px" />
      </button>
      <p class="text-center">
        Санкт-Петербург, 2-я Красноармейская 11
        <br />
        Краснодар, ул. Пашковская 83
      </p>
    </div>
    <div class="col-6 text-center">
      <button class="mb-20" style="padding:0;cursor:default">
        <img src="/site/images/imp.jpg" alt="Rservice" style="height:90px" />
      </button>
      <p class="text-center">Санкт-Петербург, ул. Кирочная, д.29<br /></p>
    </div>
    <!--  -->
    <div class="col-6">
      <div class="text-center mb-15">
        <el-button type="success" size="mini" icon="el-icon-plus">
          Добавить сайт
        </el-button>
      </div>
      <draggable
        :list="rservice"
        @change="log"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        group="people"
        style="padding-right:55px"
      >
        <transition-group
          :name="!drag ? 'flip-list' : null"
          class="row"
          type="transition"
        >
          <div
            v-for="element in rservice"
            :key="element.name"
            @dblclick="editSite(element._id)"
            class="col-6 mb-15"
          >
            <div class="bg-fff">{{ element.name }}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="col-6">
      <div class="text-center mb-15">
        <el-button type="success" size="mini" icon="el-icon-plus">
          Добавить сайт
        </el-button>
      </div>
      <draggable
        :list="impuls"
        @change="log"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        group="people"
        style="padding-left:55px"
      >
        <transition-group
          :name="!drag ? 'flip-list' : null"
          class="row"
          type="transition"
        >
          <div
            v-for="element in impuls"
            :key="element.name"
            @dblclick="editSite(element._id)"
            class="col-6 mb-15"
          >
            <div class="bg-fff">{{ element.name }}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drag: true,
      rservice: [
        { name: 'Apple 1', _id: 1 },
        { name: 'Acer 2', _id: 2 },
        { name: 'Nokia 3', _id: 3 },
        { name: 'Canon 4', _id: 4 }
      ],
      impuls: [
        { name: 'MSI 5', _id: 5 },
        { name: 'Sony 6', _id: 6 },
        { name: 'Apple 7', _id: 7 }
      ]
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    add() {
      this.list.push({ name: 'Juan' })
    },
    replace() {
      this.list = [{ name: 'Edgard' }]
    },
    clone(el) {
      return {
        name: el.name + ' cloned'
      }
    },
    log(evt) {
      window.console.log(evt)
    },
    editSite(id) {
      console.log('id', id)
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
</style>
