/** Временное решение из-за проблем с @vue/casl */
export default ({ store }, inject) => {
  inject('abilities', (can) => {
    const access = store.getters['auth/access']
    const cans = can.split('-')
    let res = false

    // попробовать найти полное совподение
    if (access.includes(can)) return true

    if (cans.length === 0) return false
    // пройтись по списку access
    // разбиль каждое значение по "-" и попробовать найти полное совподение
    for (const item of access) {
      const items = item.split('-')
      if (items.includes(can)) return true
    }
    if (access.includes(can)) res = true
    return res
  })
}
