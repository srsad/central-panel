<template>
  <div class="row mt-20">
    <div class="col-11">
      <no-ssr>
        <!-- :controls="mapSettings.controls" -->
        <yandex-map
          :zoom="mapSettings.zoom"
          :coords="mapSettings.center"
          class="map"
        >
          <ymap-marker
            v-for="(item, idx) in $store.getters['map/points']"
            :key="idx"
            :coords="[item.lat, item.long]"
            :marker-id="`item${idx}`"
            :hint-content="item.road"
            cluster-name="previewCluster"
            marker-type="placemark"
          />
        </yandex-map>
      </no-ssr>
    </div>
    <div class="col-11">
      <h4>TODO:</h4>
      <ul>
        <li>+ календарь</li>
        <li>+ тепловые карты (придумать бесплатный вариант использования)</li>
        <li>- вывод в виде графиков (время/районы + кол-во)</li>
        <li>- фильтр по город/сайт</li>
        <li>
          - выдавать информацию по видимой области карты и давать более
          подробный отчет (время, сайт, запрос, ip и т.д.)
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { moment } from 'moment'
// import AppChart from "./Chart.vue"
// import { loadYmap } from 'vue-yandex-maps'

export default {
  components: {
    // AppChart
  },
  data() {
    return {
      mapSettings: {
        coords: [54.82896654088406, 39.831893822753904],
        center: [59.95843390509687, 30.338157453125035],
        zoom: 11,
        controls: []
      },
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
  mounted() {
    // this.getToday()
    // loadYmap({  })
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
        // console.log('err', err)
        this.$store.commit('SET_ERROR', e.response.data.message, { root: true })
        throw e
      }
    }
    // yamapsInit() {
    //   // eslint-disable-next-line no-undef
    //   ymaps.ready(['Heatmap']).then(() => {
    //     // eslint-disable-next-line no-undef
    //     const myMap = new ymaps.Map('map', {
    //       ...this.mapSettings
    //     })

    //     // eslint-disable-next-line
    //     const heatmap = new ymaps.Heatmap(this.mapPoints, {
    //       // Радиус влияния.
    //       radius: 15,
    //       // Нужно ли уменьшать пиксельный размер точек при уменьшении зума. False - не нужно.
    //       dissipating: true,
    //       // Прозрачность тепловой карты.
    //       opacity: 0.8,
    //       // Прозрачность у медианной по весу точки.
    //       intensityOfMidpoint: 0.2,
    //       // JSON описание градиента.
    //       gradient: {
    //         0.1: 'rgba(128, 255, 0, 0.7)',
    //         0.2: 'rgba(255, 255, 0, 0.8)',
    //         0.7: 'rgba(234, 72, 58, 0.9)',
    //         1.0: 'rgba(162, 36, 25, 1)'
    //       }
    //     })
    //     heatmap.setMap(myMap)

    //     document.getElementById('destroyMap').onclick = function() {
    //       myMap.destroy()
    //     }
    //   })
    // },
    // async getSelectDays() {
    //   try {
    //     const logs = await this.axios.get(
    //       'https://rloger.herokuapp.com/api/log/getdeterange/',
    //       {
    //         headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
    //         params: {
    //           range: this.range
    //         }
    //       }
    //     )
    //     this.mapPoints = []
    //     this.setAllData(logs.data.data)
    //   } catch (err) {
    //     // console.log('err', err)
    //   }
    // },
    // setAllData(datas) {
    //   for (const item of datas) {
    //     this.mapPoints.push([item.lat, item.long])
    //   }
    //   this.yamapsInit() // загрузка данных на карту

    //   const area = [] // список районов
    //   // const timestamps = [] // временной промежуток 20190925
    //   datas.forEach((element) => {
    //     // const timestamp = ('' + element.timestamps).substr(0, 8)
    //     if (!area.includes(element.district)) area.push(element.district)
    //   })

    //   // console.log(area);
    //   // console.log(this.chartData[0]);
    // }
  }
}
</script>

<style>
.ymap-container {
  width: 100%;
  height: 600px;
}
</style>
