export default function({ store, redirect }) {
  console.log('export default function auth')
  if (!store.getters['auth/isAuthenticated']) {
    redirect('/auth')
  }
}
