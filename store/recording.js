/**
 * Стор для списка записей (recording.vue)
 */

export const state = () => ({
  recording: [], // список для записи
  notRecording: [] // список не для записи
})

export const actions = {
  async fetchNotRecording({ commit }) {
    try {
      const notRecording = await this.$axios.$get(
        '/api/v1/recording/not/getAll'
      )
      commit('SET_NOT_RECORDING', notRecording)
    } catch (e) {
      this.$store.commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  setRecording({ commit }, recording) {
    commit('SET_RECORDING', recording)
  },
  setNotRecording({ commit }, notRecording) {
    commit('SET_NOT_RECORDING', notRecording)
  }
}

export const mutations = {
  SET_RECORDING(state, recording) {
    state.recording = recording
  },
  SET_NOT_RECORDING(state, notRecording) {
    state.notRecording = notRecording
  }
}

export const getters = {
  recording: (state) => state.recording,
  notRecording: (state) => state.notRecording
}
