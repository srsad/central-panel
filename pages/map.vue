<template>
  <div class="row w100 mt-15">
    <div class="col-12 mt-10 mb-10">
      <h3>Горячие карты</h3>
    </div>
    <div class="col-12">
      <app-hot-map />
    </div>
    <!-- <div class="col-11">
      <h4>TODO:</h4>
      <ul>
        <li>+ календарь</li>
        <li>+ тепловые карты (придумать бесплатный вариант использования)</li>
        <li>+ фильтр по город</li>
        <li>- вывод в виде графиков (время/районы + кол-во)</li>
        <li>- фильтр по сайт</li>
        <li>
          - выдавать информацию по видимой области карты и давать более
          подробный отчет (время, сайт, запрос, ip и т.д.)
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import AppHotMap from '~/components/map/Panel'

export default {
  components: {
    AppHotMap
  },
  head() {
    return {
      script: [
        {
          src: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=65ee8b15-0d5d-45a9-b270-25a4baf7280f',
          type: 'text/javascript'
        },
        {
          src: 'https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js',
          type: 'text/javascript'
        }
      ]
    }
  },
  fetch({ store }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/map',
        label: 'Тепловые карты'
      }
    ])
  }
}
</script>
