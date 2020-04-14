export default function({ store, redirect, route }) {
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/auth')
  } else if (
    !store.getters['auth/isAuthenticated'] &&
    route.fullPath === '/auth'
  ) {
    redirect('/')
  }
}
