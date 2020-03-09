/**
 * Стор для работы с данными пользователей
 */

export const state = () => ({
  users: [], // список пользователей
  roles: [], // список ролей
  user: null, // пользователь для редактирования
  role: null // роль для редактирования
})

export const actions = {
  async createRole({ commit }, formData) {
    // TODO вставлять в запрос userID
    try {
      await this.$axios.$post('/api/v1/role/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async updateRole({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/role/update/' + formData._id, formData)
      // commit('SET_ROLES', [])
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchRoles({ commit }) {
    try {
      const roles = await this.$axios.$get('/api/v1/role/getall')
      commit('SET_ROLES', roles.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  updateUser({ commit }, formData) {
    commit('UPDATE_USER', formData)
  },
  fetchUsers({ commit }, params) {
    const users = []
    commit('LOAD_USERS', users)
  }
}

export const mutations = {
  UPDATE_USER(state, formData) {},
  SET_USERS(state, users) {
    state.users = users
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_ROLE(state, role) {
    state.role = role
  }
}

export const getters = {
  users: (state) => state.users,
  roles: (state) => state.roles,
  user: (state) => state.user,
  role: (state) => state.role
}
