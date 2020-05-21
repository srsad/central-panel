<template>
  <div class="row">
    <div class="col-12">
      <app-settings-bar />
    </div>

    <div class="col-12">
      <app-map />
    </div>
  </div>
</template>

<script>
import AppSettingsBar from './SettingsBar.vue'
import AppMap from './Map.vue'

export default {
  components: {
    AppMap,
    AppSettingsBar
  }
}
</script>
