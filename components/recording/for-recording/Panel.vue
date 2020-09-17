<template>
  <div class="row">
    <div class="col">
      <h3 class="mt-10">Tехника для записи</h3>
    </div>
    <div class="col text-right">
      <el-button
        v-if="$abilities('recording-for_recording_panel-create')"
        @click="create"
        type="success"
        size="mini"
        class="mt-10"
        icon="el-icon-plus"
        title="Добавить технику для записи"
      />
    </div>

    <div class="col-12">
      <div
        v-for="(category, idx) of $store.getters['recording/forRecordingSort']"
        :key="idx"
        class="row"
      >
        <div class="col-12">
          <h4>{{ category[0] }}</h4>
        </div>

        <div v-for="(item, _idx) in category[1]" :key="_idx" class="col-6 mb-5">
          <!--  -->
          <div :class="['recording', item.curser ? 'active' : '']">
            <el-popover
              placement="top-start"
              width="400"
              class="recording__title"
              trigger="click"
            >
              <div class="row">
                <template v-if="item.rservice">
                  <div class="col-5">
                    <b style="font-size:12px">Rservice</b>
                  </div>
                  <div class="col-7 pl-0">{{ item.rservice }}</div>
                  <div class="col-12 pb-5 border-bottom"></div>
                </template>
                <template v-if="item.impuls">
                  <div class="col-5">
                    <b style="font-size:12px">Impuls</b>
                  </div>
                  <div class="col-7 pl-0">{{ item.impuls }}</div>
                  <div class="col-12 pb-5 border-bottom"></div>
                </template>
                <template v-if="item.krd">
                  <div class="col-5">
                    <b style="font-size:12px">Краснодар</b>
                  </div>
                  <div class="col-7 pl-0">{{ item.krd }}</div>
                  <div class="col-12 pb-5 border-bottom"></div>
                </template>
                <template v-if="item.elservice">
                  <div class="col-5">
                    <b style="font-size:12px">Выездной сервис</b>
                  </div>
                  <div class="col-7 pl-0">{{ item.elservice }}</div>
                  <div class="col-12 pb-5 border-bottom"></div>
                </template>
                <template v-if="item.msk1">
                  <div class="col-5">
                    <b style="font-size:12px">МСК Новослободская</b>
                  </div>
                  <div class="col-7 pl-0">{{ item.msk1 }}</div>
                  <div class="col-12 pb-5 border-bottom"></div>
                </template>
                <template v-if="item.msk2">
                  <div class="col-5">
                    <b style="font-size:12px">МСК Армянский</b>
                  </div>
                  <div class="col-7 pl-0">{{ item.msk2 }}</div>
                  <div class="col-12 pb-5 border-bottom"></div>
                </template>
                <div v-if="item.curser" class="col-12">
                  <b>Курьер платный</b>
                </div>
              </div>
              <div slot="reference">
                {{ item.name }}
              </div>
            </el-popover>
            <!-- btns -->
            <div class="recording__btn">
              <el-button
                v-if="$abilities('recording-for_recording_panel-update')"
                @click="edit(item)"
                :loading="loading"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                title="Редактировать"
              />

              <el-popconfirm
                v-if="$abilities('recording-for_recording_panel-remove')"
                @onConfirm="remove(item)"
                title="Удалить запись?"
                confirm-button-text="Да"
                confirm-button-type="success"
                cancel-button-type="default"
                cancel-button-text="Нет, спасибо"
              >
                <el-button
                  slot="reference"
                  :loading="loading"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </div>
            <!-- end btns -->
          </div>
          <!--  -->
        </div>
        <div class="col-12 mb-10"><hr style="opacity:.2" /></div>
      </div>
    </div>
    <!-- создание -->
    <app-window-create />
    <!-- Редактирование -->
    <app-window-update />
  </div>
</template>

<script>
import AppWindowCreate from '~/components/recording/for-recording/window/Create'
import AppWindowUpdate from '~/components/recording/for-recording/window/Update'

export default {
  components: {
    AppWindowCreate,
    AppWindowUpdate
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    create() {
      if (this.loading === true) return
      if (!this.$abilities('recording-for_recording_panel-create')) return
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateForRecording',
        status: true
      })
    },
    edit(item) {
      if (this.loading === true) return
      if (!this.$abilities('recording-for_recording_panel-update')) return
      this.$store.commit('recording/SET_FOR_RECORDING', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateForRecording',
        status: true
      })
    },
    async remove(item) {
      if (!this.$abilities('recording-for_recording_panel-remove')) return
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/recording/for/remove/' + item._id)
        await this.$store.dispatch('recording/fetchForRecording')
        this.$notify({
          message: 'Запись удалена!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
