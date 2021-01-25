import Vue from 'vue'
import { VueEditor } from 'vue2-editor'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import 'ag-grid-enterprise'
import { AgGridVue } from 'ag-grid-vue'

Vue.component('vue-editor', VueEditor)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)
Vue.component('ag-grid-vue', AgGridVue)
