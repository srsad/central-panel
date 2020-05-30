<template>
  <div class="row mt-20">
    <div class="col-11">
      <div id="ymap" class="ymap-container"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
export default {
  data() {
    return {
      mapObjects: [],
      mapPoints: [],
      chartData: [
        ['Район 1', 'Район 2', 'Район 3', 'Район 4'],
        ['День 1', 1000, 400, 200],
        ['День 2', 1170, 460, 250],
        ['День 3', 660, 1120, 300],
        ['День 4', 1030, 540, 350],
        ['День 5', 1030, 540, 350]
      ]
    }
  },
  computed: {
    mapSettings() {
      const cities = this.$store.getters['map/cityes']
      const city = this.$store.getters['map/city']
      const { coords } = cities.find((el) => el.city === city) // определяем координаты карты
      const res = {
        coords,
        center: coords,
        zoom: 11,
        controls: ['zoomControl']
      }
      return res
    },

    mapLeeength() {
      return this.$store.getters['map/pointLength']
    }
  },
  watch: {
    mapLeeength(val) {
      // после получения данных, обновляем карту
      if (val > 0) this.yamapsInit()
    }
  },
  async mounted() {
    await this.getToday()
  },
  methods: {
    async getToday() {
      try {
        const points = await this.$axios.$get(
          'https://rloger.herokuapp.com/api/log/today',
          {
            headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' }
          }
        )
        this.$store.dispatch('map/setPoints', points.data)
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message, { root: true })
        throw e
      }
    },
    yamapsInit() {
      // eslint-disable-next-line no-undef
      ymaps.ready(['Heatmap']).then(() => {
        // eslint-disable-next-line no-undef
        const myMap = new ymaps.Map('ymap', {
          ...this.mapSettings
        })
        // eslint-disable-next-line
        const heatmap = new ymaps.Heatmap(this.$store.getters['map/onlyPoints'], {
          radius: 15, // Радиус влияния.
          dissipating: true, // Нужно ли уменьшать пиксельный размер точек при уменьшении зума. False - не нужно.
          opacity: 0.7, // Прозрачность тепловой карты.
          intensityOfMidpoint: 0.2, // Прозрачность у медианной по весу точки.
          // JSON описание градиента.
          gradient: {
            0.1: 'rgba(128, 255, 0, 0.5)',
            0.2: 'rgba(255, 255, 0, 0.7)',
            0.7: 'rgba(234, 72, 58, 0.8)',
            1.0: 'rgba(162, 36, 25, 1)'
          }
        })
        heatmap.setMap(myMap)

        document.getElementById('refreshMap').onclick = function() {
          myMap.destroy()
        }
      })
    }
  }
}
</script>

<style>
.ymap-container {
  width: 100%;
  height: 600px;
}
</style>
