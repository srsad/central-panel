<template>
  <div class="row">
    <div class="col-6">
      <h3 class="mt-10">Tехника не для записи</h3>
    </div>
    <div class="col-6 text-right mt-10 mb-30">
      <el-form
        ref="notRecForm"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
        @submit.prevent="add"
        v-if="$abilities('recording-not_recording_panel-create')"
        class="tableForm"
      >
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="Техника не для записи"
            class="success-important"
            size="mini"
          >
            <template slot="append">
              <el-button
                :loading="loading"
                @click="add"
                size="mini"
                type="success"
                icon="el-icon-plus"
                title="Создать новый ключ"
              />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--  -->
    <div
      v-for="(item, idx) in $store.getters['recording/notRecording']"
      :key="idx"
      class="col-6 mb-15"
    >
      <!--  -->
      <div class="recording" style="cursor:default">
        <div class="recording__title">
          {{ item.name }}
        </div>
        <!-- btns -->
        <div class="recording__btn">
          <el-button
            v-if="$abilities('recording-not_recording_panel-update')"
            @click="edit(item)"
            :loading="loading"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            title="Редактировать"
          />
          <el-popconfirm
            v-if="$abilities('recording-not_recording_panel-remove')"
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
              title="Удалить"
              icon="el-icon-delete"
            />
          </el-popconfirm>
        </div>
        <!-- end btns -->
      </div>
    </div>
    <app-window-update />
  </div>
</template>

<script>
import AppWindowUpdate from '~/components/recording/for-not-recording/window/Updae'

export default {
  components: { AppWindowUpdate },
  data() {
    return {
      loading: false,
      search: '',
      form: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите запись',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символа',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async add() {
      await this.$refs.notRecForm.validate(async (valid) => {
        if (valid) {
          try {
            await this.$axios.$post('/api/v1/recording/not/create', this.form)
            await this.$store.dispatch('recording/fetchNotRecording')
            this.form.name = ''
            this.$notify({
              message: 'Запись успешно создан!',
              customClass: 'success-notyfy'
            })
          } catch (e) {
            this.$store.commit('SET_ERROR', e.response.data.message)
          }
        } else {
          return false
        }
      })
    },
    async remove(item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/recording/not/remove/' + item._id)
        await this.$store.dispatch('recording/fetchNotRecording')
        this.$notify({
          message: 'Запись удалена!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    edit(item) {
      if (this.loading === true) return
      if (!this.$abilities('recording-not_recording_panel-update')) return
      this.$store.commit('recording/SET_NOT_RECORDING', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerUpdateNotRecording',
        status: true
      })
    }
  }
}
</script>
