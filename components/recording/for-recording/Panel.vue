<template>
  <div>
    <div class="col-11">
      <el-form
        ref="notRecForm"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
        v-if="$abilities('recording-not_recording_panel-create')"
      >
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="Техника не для записи"
            style="width:400px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            @click="add"
            type="success"
            icon="el-icon-plus"
            title="Создать новый ключ"
          />
        </el-form-item>
      </el-form>
    </div>
    <!--  -->
    <div class="col-11">
      <el-table
        :data="$store.getters['recording/notRecording']"
        size="small"
        stripe
      >
        <el-table-column width="45" align="right">
          <template slot-scope="scope">
            <b>{{ scope.$index + 1 }}</b>
          </template>
        </el-table-column>
        <el-table-column label="Техника не для записи" prop="name" />
        <el-table-column
          v-if="
            $abilities('recording-not_recording_panel-update') ||
              $abilities('recording-not_recording_panel-remove')
          "
          align="right"
          width="250"
        >
          <template slot-scope="scope">
            <!-- <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">
              Edit
            </el-button> -->
            <el-popconfirm
              v-if="$abilities('recording-not_recording_panel-remove')"
              @onConfirm="remove(scope.row)"
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
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
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
      await console.log('asd', item)
    }
  }
}
</script>
