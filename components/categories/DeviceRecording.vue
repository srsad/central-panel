<template>
  <div class="recording-device">
    <template v-if="$abilities('recording-devace_list-update')">
      <el-popover
        v-if="!checkDevice()"
        trigger="hover"
        placement="right"
        width="160"
      >
        <p>Запретить запись?</p>
        <div style="text-align: right; margin: 0">
          <el-button
            :disabled="loading"
            :loading="loading"
            @click="notAvailabel()"
            type="primary w100"
            size="mini"
          >
            Да
          </el-button>
        </div>
        <el-button
          slot="reference"
          :disabled="loading"
          :loading="loading"
          icon="el-icon-success"
          size="mini"
        />
      </el-popover>
      <!--  -->
      <el-popover v-else trigger="hover" placement="right" width="160">
        <p>Разрешить запись?</p>
        <div style="text-align: right; margin: 0">
          <el-button
            :disabled="loading"
            :loading="loading"
            @click="availabel()"
            type="primary w100"
            size="mini"
          >
            Да
          </el-button>
        </div>
        <el-button
          slot="reference"
          :disabled="loading"
          :loading="loading"
          type="default color-red"
          icon="el-icon-error"
          size="mini"
        />
      </el-popover>
    </template>
    <template v-else>
      <el-popover v-if="checkDevice()" trigger="hover" placement="right">
        <p>Техника не для записи!</p>
        <i slot="reference" class="color-red el-icon-error" />
      </el-popover>
    </template>
    <!--  -->
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      item: {}
    }
  },
  methods: {
    /**
     * Разрешить запись
     */
    async availabel() {
      this.loading = true
      try {
        // eslint-disable-next-line
        await this.$axios.$delete(`/api/v1/recording/not-device/remove/${this.item._id}`)
        await this.$store.dispatch('recording/fetchNotRecordingDevice')
        this.item = {}
        this.checkDevice()
      } catch (e) {
        console.error(
          'Ошибка при попытке выполнения availabel',
          e.response.data.message
        )
      } finally {
        this.loading = false
      }
    },
    /**
     * Запретить запись
     */
    async notAvailabel() {
      this.loading = true
      try {
        await this.$axios.$post('/api/v1/recording/not-device/create', {
          name: this.name,
          brand: this.$store.getters['source/page/params'].brand,
          status: true
        })
        await this.$store.dispatch('recording/fetchNotRecordingDevice')
        this.item = {}
        this.checkDevice()
      } catch (e) {
        console.error(
          'Ошибка при попытке выполнения notAvailabel',
          e.response.data.message
        )
      } finally {
        this.loading = false
      }
    },
    /**
     * Проверка наличия в списке
     */
    checkDevice() {
      let item = this.$store.state.recording.recordingDeviceList
      item = item.find((el) => el.name === this.name)
      if (item) {
        this.item = item
        return true
      }
      this.item = {}
      return false
    }
  }
}
</script>

<style lang="sass">
.recording-device
  display: inline-block
  margin-right: 10px
  & .el-button
    padding: 12px 7px
</style>
