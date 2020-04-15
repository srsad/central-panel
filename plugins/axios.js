export default function({ $axios, redirect, store }) {
  $axios.interceptors.request.use((request) => {
    if (
      store.getters['auth/isAuthenticated'] &&
      !request.headers.common.Authorization &&
      // TODO чекать это условие
      // исключаем заголовок аторизации cors
      !request.url.includes('/rest/?')
    ) {
      request.headers.common.Authorization = `Bearer ${store.getters['auth/token']}`
    }
    return request
  })

  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispath('auth/logout')
        redirect('/auth')
      }
    }
  })
}
