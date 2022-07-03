/**
 * Стор для списка записей (recording.vue)
 */

export const state = () => ({
  recordingDeviceList: [], // список устроиств не для записи, при выборе категории
  recording: [], // список для записи
  notRecording: [], // список не для записи
  editForRecording: null, // редактировать елемент "для записи"
  editNotRecording: null // редактировать елемент "не для записи"
})

export const actions = {
  async fetchNotRecording({ commit }) {
    try {
      const notRecording = await this.$axios.$get(
        '/api/v1/recording/not/getAll'
      )
      commit('SET_NOT_RECORDINGS', notRecording)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  setNotRecording({ commit }, notRecording) {
    commit('SET_NOT_RECORDINGS', notRecording)
  },
  async fetchForRecording({ commit, axios }) {
    try {
      const forRecording = await this.$axios.$get(
        '/api/v1/recording/for/getAll'
      )
      commit('SET_FOR_RECORDINGS', forRecording)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  setForRecording({ commit }, recording) {
    commit('SET_FOR_RECORDINGS', recording)
  },
  /**
   * Список устроист не для записи
   */
  async fetchNotRecordingDevice({ rootGetters, commit }) {
    try {
      const items = await this.$axios.$get(
        `/api/v1/recording/not-device/get-by-brand/${rootGetters['repair/brand/brand'].name}`
      )
      commit('SET_NOT_RECORDING_DEVICE', items)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_FOR_RECORDINGS(state, recording) {
    state.recording = recording
  },
  SET_FOR_RECORDING(state, recording) {
    state.editForRecording = recording
  },
  SET_NOT_RECORDINGS(state, notRecording) {
    state.notRecording = notRecording
  },
  SET_NOT_RECORDING(state, notRecording) {
    state.editNotRecording = notRecording
  },
  SET_NOT_RECORDING_DEVICE(state, recordingDeviceList) {
    state.recordingDeviceList = recordingDeviceList
  }
}

export const getters = {
  forRecording: (state) => state.recording,
  forRecordingSort: (state) => {
    const res = new Map()
    for (const item of state.recording) {
      const el = res.get(item.category)
      if (!el) {
        res.set(item.category, [item])
      } else {
        el.push(item)
        res.set(item.category, el)
      }
    }
    return res
  },
  notRecording: (state) => state.notRecording
}
