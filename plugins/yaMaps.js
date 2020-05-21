import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

Vue.use(YmapPlugin, {
  apiKey: '65ee8b15-0d5d-45a9-b270-25a4baf7280f',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
})
