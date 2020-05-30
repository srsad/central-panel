<template>
  <div class="row">
    <div class="col-12">
      <app-settings-bar />
    </div>
    <div class="col-12">
      <app-map />
    </div>
    <!-- <div class="col-11 mt-40">
      <app-chart />
    </div> -->
  </div>
</template>

<script>
import AppSettingsBar from './SettingsBar.vue'
// import AppChart from './Chart'
import AppMap from './Map.vue'

export default {
  components: {
    AppMap,
    // AppChart,
    AppSettingsBar
  }
}
</script>
