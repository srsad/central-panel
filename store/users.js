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
  async createUser({ commit }, formData) {
    // TODO вставлять в запрос userID
    try {
      await this.$axios.$post('/api/v1/user/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async updateUser({ commit }, formData) {
    try {
      await this.$axios.$post(
        '/api/v1/user/update/' + formData.get('_id'),
        formData
      )
      // commit('SET_USER', [])
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchUsers({ commit }) {
    try {
      const users = await this.$axios.$get('/api/v1/user/getall')
      commit('SET_USERS', users.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
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
  role: (state) => state.role,
  managers: (state) => state.users,
  performers: (state) => state.users
}
