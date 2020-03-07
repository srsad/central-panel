/**
 * Стор для работы с данными пользователей
 */

export const state = () => ({
  users: []
})

export const actions = {
  updateUser({ commit }, formData) {
    commit('UPDATE_USER', formData)
  },
  loadUsers({ commit }, params) {
    const users = []
    commit('LOAD_USERS', users)
  }
}

export const mutations = {
  UPDATE_USER(state, formData) {},
  LOAD_USERS(state, users) {
    state.users = users
  }
}
