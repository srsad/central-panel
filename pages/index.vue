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
        <el-button
          @click="createSiteSource('rservice')"
          type="success"
          size="mini"
          icon="el-icon-plus"
        >
          Добавить сайт
        </el-button>
      </div>
      <draggable
        :list="sources.rservice"
        @change="log"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        :disabled="dragDisabled"
        group="company"
        style="padding-right:55px"
      >
        <transition-group
          :name="!drag ? 'flip-list' : null"
          class="row"
          type="transition"
        >
          <app-source-item
            v-for="element in sources.rservice"
            :key="element.name"
            :item="element"
            @edit="openEditWindow"
            @remove="onRemove"
          />
        </transition-group>
      </draggable>
    </div>
    <div class="col-6">
      <div class="text-center mb-15">
        <el-button
          @click="createSiteSource('impuls')"
          type="success"
          size="mini"
          icon="el-icon-plus"
        >
          Добавить сайт
        </el-button>
      </div>
      <draggable
        :list="sources.impuls"
        @change="log"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        :disabled="dragDisabled"
        group="company"
        style="padding-left:55px"
      >
        <transition-group
          :name="!drag ? 'flip-list' : null"
          class="row"
          type="transition"
        >
          <app-source-item
            v-for="element in sources.impuls"
            :key="element.name"
            :item="element"
            @edit="openEditWindow"
            @remove="onRemove"
          />
        </transition-group>
      </draggable>
    </div>
    <!--  -->
    <app-window-source-create :company="company" />
    <app-window-source-update />
  </div>
</template>

<script>
import AppWindowSourceCreate from '~/components/sourceSite/window/Create'
import AppWindowSourceUpdate from '~/components/sourceSite/window/Update'
import AppSourceItem from '~/components/sourceSite/SourceItem'

export default {
  components: {
    AppWindowSourceCreate,
    AppWindowSourceUpdate,
    AppSourceItem
  },
  data() {
    return {
      company: '',
      drag: true,
      dragDisabled: false // блокировка перетаскивания
    }
  },
  computed: {
    sources() {
      return this.$store.getters['source/control/sortSources']
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  /** суем данные источников в стор */
  async fetch({ store, error }) {
    try {
      if (store.getters['source/control/sources'].length === 0) {
        await store.dispatch('source/control/fetchItems')
      }
    } catch (e) {
      error(e)
    }
  },
  methods: {
    /** Лог перемещений и перемещение между командами */
    async log(evt) {
      // console.log('evt', evt)
      if (evt.added) {
        const sources = await JSON.parse(JSON.stringify(this.sources))
        const _id = evt.added.element._id
        let company = ''
        for (const item in sources) {
          const _company = sources[item].find((el) => el._id === _id)
          if (_company) company = item
        }

        if (company) {
          try {
            const fd = new FormData()
            fd.append('company', company)

            await this.$axios.$post(`/api/v1/source-site/update/${_id}`, fd)
            this.$store.dispatch('source/control/fetchItems')
            this.$notify({
              message: 'Источник успушно перемещен!',
              customClass: 'success-notyfy'
            })
          } catch (e) {
            console.log(e)
            this.$store.commit('SET_ERROR', e.response.data.message)
          }
        }
      }
    },
    /** Открываем окно редактиирования источника */
    openEditWindow(item) {
      this.$store.commit('source/control/SET_SOURCE', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateSource',
        status: true
      })
    },
    /** Удаление источника */
    async onRemove(item) {
      try {
        await this.$axios.$delete('/api/v1/source-site/remove/' + item._id)
        this.$store.dispatch('source/control/fetchItems')
        this.$notify({
          message: 'Источник успушно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },
    /** Открытие окна создания + проверка выбора источника */
    createSiteSource(company) {
      this.company = company || ''
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateSource',
        status: true
      })
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
