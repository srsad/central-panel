<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs value="not-for-recording">
        <el-tab-pane label="Tехника для записи" name="for-recording">
          техника для записи
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('recording-not_recording_panel-read')"
          label="Tехника не для записи"
          name="not-for-recording"
        >
          <app-for-recording-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppForRecordingPanel from '~/components/recording/for-recording/Panel.vue'
export default {
  components: {
    AppForRecordingPanel
  },
  async fetch({ store }) {
    await store.dispatch('recording/fetchNotRecording')
  }
}
</script>
