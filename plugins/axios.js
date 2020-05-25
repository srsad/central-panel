export default function({ $axios, redirect, store }) {
  $axios.interceptors.request.use((request) => {
    if (
      store.getters['auth/isAuthenticated'] &&
      !request.headers.common.Authorization &&
      // TODO чекать это условие
      // исключаем заголовок аторизации cors для источников
      !request.url.includes('/rest/?')
    ) {
      // TODO проверять слепок
      // TODO проверять время жизни токена
      // TODO если он протух проверять наличие рефреш токена
      //  TODO проверять статус пользователя.
      //  TODO + продление сессии.
      //    TODO удаление старого токена, создание нового
      //    TODO обновление данных пользователя
      request.headers.common.Authorization = `Bearer ${store.getters['auth/token']}`
      // TODO в ином случае logout
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
