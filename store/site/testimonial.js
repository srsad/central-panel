/**
 * Стор списка отзывов
 */

export const state = () => ({
  sites: [], // список сайтов для вывода в селект
  siteUrl: null, // выбранное доменное имя для загрузки отзывов
  testimonials: [], // список отзывов
  testimonial: null // отзыв для редактирования
})

export const actions = {
  /**
   * Возвращаем список брендов + доменов
   */
  async fetchSites({ commit }) {
    try {
      const testimonials = await this.$axios.$get(
        '/api/v1/site/testimonial/get-brands-and-sites'
      )
      commit('SET_SITES', testimonials.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /**
   * Загружаем список отзывов
   */
  async fetchTestimonials({ commit }, siteUrl) {
    try {
      const testimonials = await this.$axios.$get(
        '/api/v1/site/testimonial/bysiteurl/' + siteUrl
      )
      commit('SET_TESTIMONIALS', testimonials.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /**
   * Создать отзыв
   */
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/site/testimonial/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /**
   * Отредактировать отзыв
   */
  async update({ commit }, formData) {
    try {
      await this.$axios.$put(
        '/api/v1/site/testimonial/update/' + formData._id,
        formData
      )
      // commit('SET_USER', [])
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_SITES(state, sites) {
    state.sites = sites
  },
  SET_SITE_URL(state, siteUrl) {
    state.siteUrl = siteUrl
  },
  SET_TESTIMONIALS(state, testimonials) {
    state.testimonials = testimonials
  },
  SET_TESTIMONIAL(state, testimonial) {
    state.testimonial = testimonial
  }
}

export const getters = {
  sites: (state) => state.sites,
  testimonials: (state) => state.testimonials,
  testimonial: (state) => state.testimonial
}
