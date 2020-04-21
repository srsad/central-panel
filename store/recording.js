/**
 * Стор для списка записей (recording.vue)
 */

export const state = () => ({
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
  setNotRecording({ commit }, notRecording) {
    commit('SET_NOT_RECORDINGS', notRecording)
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
