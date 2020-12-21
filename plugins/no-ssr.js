import Vue from 'vue'
import { VueEditor } from 'vue2-editor'
import VGrid from '@revolist/vue-datagrid'
// import { HotTable, HotColumn } from '@handsontable/vue'
import FancyGridVue from 'fancy-grid-vue'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

Vue.component('vue-editor', VueEditor)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)
Vue.component('v-grid', VGrid)
Vue.component('fancy-grid-vue', FancyGridVue)
// Vue.component('hot-table', HotTable)
// Vue.component('hot-column', HotColumn)
