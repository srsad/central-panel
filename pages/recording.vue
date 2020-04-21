<template>
  <div class="row w100 mt-15">
    <div
      v-if="$abilities('recording-for_recording_panel-read')"
      class="col-lg-6"
    >
      <app-for-recording-panel />
    </div>
    <div
      v-if="$abilities('recording-not_recording_panel-read')"
      class="col-lg-5 offset-lg-1"
    >
      <app-for-not-recording-panel />
    </div>
  </div>
</template>

<script>
import AppForNotRecordingPanel from '~/components/recording/for-not-recording/Panel'
import AppForRecordingPanel from '~/components/recording/for-recording/Panel'

export default {
  components: {
    AppForNotRecordingPanel,
    AppForRecordingPanel
  },
  async fetch({ store }) {
    await store.dispatch('recording/fetchNotRecording')
    await store.dispatch('recording/fetchForRecording')
  }
}
</script>
