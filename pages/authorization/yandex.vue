<template>
  <div class="mt-30 text-center">
    <p v-if="created">Происходит процесс авторизации...</p>
    <p v-else>
      {{ message }}
      <br />
      <n-link to="/settings/#yandex">Вернуться</n-link>
    </p>
  </div>
</template>

<script>
export default {
  layout: 'publick',
  data() {
    return {
      created: true,
      message: ''
    }
  },
  async mounted() {
    const regex = /(#access_token=)(.*)(?=&t)/m
    const hash = window.location.hash
    const token = regex.exec(hash)
    if (token) {
      try {
        // Данные пользователя
        const profile = await this.$axios.$get(
          'https://cors-anywhere.herokuapp.com/https://login.yandex.ru/info?format=json&with_openid_identity=1',
          {
            headers: {
              common: {
                Authorization: 'OAuth ' + token[token.length - 1]
              }
            }
          }
        )

        const fd = {
          user_id: profile.id,
          login: profile.display_name,
          client_id: profile.client_id,
          emails: profile.emails,
          fullname: profile.real_name
        }

        await this.$axios.$post('/api/v1/analytics/yandex/user/create', fd)
        this.$notify({
          message: 'Аккаут успешно привязан!',
          customClass: 'success-notyfy'
        })
        this.$router.push('/settings/#yandex')
      } catch (e) {
        this.created = false
        this.message = e.response.data.message
        this.$store.commit('SET_ERROR', e.response.data.message)
        console.error('Не удалось получить данные пользователя', e.response)
      }
    } else {
      this.created = false
      this.message = 'Не удалось получить токен'
      this.$store.commit('SET_ERROR', 'Не удалось получить токен')
    }
  }
}
</script>
