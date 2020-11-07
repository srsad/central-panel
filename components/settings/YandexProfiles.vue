<template>
  <div class="row">
    <div class="col-12">
      <!--  -->
      <el-tabs type="border-card" value="accaunts">
        <el-tab-pane label="Аккаунты" name="accaunts">
          <div>
            <a
              :href="
                `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}`
              "
              class="el-button el-button--success el-button--small"
            >
              Добавить аккаунт
            </a>
          </div>
          <!--  -->
          <div>
            <ul class="yandexAccaunts">
              <li v-for="(item, idx) in accaunts" :key="idx">
                <div class="yandexAccaunts__login">
                  {{ item.login }}
                </div>
                <div class="yandexAccaunts__btn">
                  <el-popconfirm
                    v-if="$abilities('settings-yandex_profiles_panel-remove')"
                    @onConfirm="removeAccaunt(item._id)"
                    title="Удалить аккаунт?"
                    confirm-button-text="Да"
                    confirm-button-type="success"
                    cancel-button-type="default"
                    cancel-button-text="Нет, спасибо"
                  >
                    <el-button
                      slot="reference"
                      :loading="loading"
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      title="Удалить"
                    />
                  </el-popconfirm>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Инструкция" name="instrunctions">
          <!-- https://oauth.yandex.ru/authorize?response_type=token&client_id=97ca9a217fc24978aa327f3dec7415c4 -->
          <p>
            Нажмите на "Добавить аккаунт", выберите нужный аккаунт и нажмите на
            кнопку "Разрешить".
          </p>
        </el-tab-pane>
      </el-tabs>
      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      accaunts: []
    }
  },
  computed: {
    clientId() {
      // return process.env.YANDEX_CLIENT_ID
      return '97ca9a217fc24978aa327f3dec7415c4'
    }
  },
  mounted() {
    this.findAccounts()
  },
  methods: {
    /**
     * Список аккаунтов
     */
    async findAccounts() {
      this.loading = true
      try {
        const { data } = await this.$axios.$get(
          '/api/v1/analytics/yandex/getall'
        )
        this.accaunts = data
      } catch (e) {
        console.error('Не удалось получить список аккаунтов', e.response)
      } finally {
        this.loading = false
      }
    },
    /**
     * Удалить аккаунт
     */
    async removeAccaunt(accauntId) {
      try {
        await this.$axios.$delete(
          '/api/v1/analytics/yandex/remove/' + accauntId
        )
        await this.findAccounts()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
        console.error('Не удалось удалить аккаунт', e.response.data.message)
      }
    }
  }
}
</script>

<style lang="sass">
.yandexAccaunts
  margin-top: 40px
  display: block
  margin: 30px 0 0 0
  padding: 0
  & li
    display: flex
    flex-wrap: wrap
    margin-bottom: 10px
    transition: all .2s
  &__login
    width: 200px
  &__btn
</style>
