<template>
  <div class="row">
    <div class="col-12">
      <el-form
        ref="APIKeyForm"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="comments">
          <el-input v-model="form.comments" placeholder="Комментарий" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.key" disabled placeholder="API ключ" />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            @click="addAPIKey('APIKeyForm')"
            type="success"
            icon="el-icon-plus"
            title="Создать новый ключ"
          />
        </el-form-item>
      </el-form>
    </div>
    <!--  -->
    <div v-if="items.length === 0" class="col-12">
      <h4>Пока ключей нет</h4>
    </div>
    <div v-else v-for="(item, idx) of items" :key="idx" class="col-12">
      <div class="row">
        <div class="col-12">
          <el-form
            :ref="`APIKeyForm${idx}`"
            :inline="true"
            :model="items[idx]"
            :disabled="loading"
            :rules="rules"
          >
            <el-form-item prop="comments">
              <el-input
                v-model="items[idx].comments"
                placeholder="Комментарий"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="items[idx].key"
                disabled
                placeholder="API ключ"
              >
                <el-button
                  slot="append"
                  @click="copyToBuffer(items[idx].key)"
                  icon="el-icon-document-copy"
                />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                @click="updateAPIKey(`APIKeyForm${idx}`, items[idx])"
                title="Редактировать"
                type="primary"
                icon="el-icon-edit"
              />
            </el-form-item>
            <!--  -->
            <el-form-item>
              <el-popconfirm
                @onConfirm="removeAPIKey(items[idx])"
                title="Удалить данный ключ?"
                confirm-button-text="Да"
                confirm-button-type="success"
                cancel-button-type="default"
                cancel-button-text="Нет, спасибо"
              >
                <el-button
                  slot="reference"
                  :loading="loading"
                  type="danger"
                  title="Удалить"
                  icon="el-icon-delete"
                />
              </el-popconfirm>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { writeText } from 'clipboard-polyfill'

export default {
  data() {
    return {
      loading: false,
      form: {
        comments: '',
        key: ''
      },
      rules: {
        comments: [
          {
            required: true,
            message: 'Введите комментарий',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
            trigger: 'blur'
          },
          {
            max: 64,
            message: 'Максимум 64 символа',
            trigger: 'blur'
          }
        ]
      },
      items: []
    }
  },
  mounted() {
    this.generateAPIKey()
    this.fetchItems()
  },
  methods: {
    addAPIKey(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.onCreate()
        } else {
          return false
        }
      })
    },
    async onCreate() {
      try {
        await this.$axios.$post('/api/v1/settings/api-key/create', this.form)
        this.clearForm()
        this.generateAPIKey()
        this.fetchItems()
        this.$notify({
          message: 'Ключь успешно создан!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },
    async updateAPIKey(form, data) {
      await this.$refs[form][0].validate(async (valid) => {
        if (valid) {
          // eslint-disable-next-line prettier/prettier
          await this.$axios.$post('/api/v1/settings/api-key/update/' + data._id, data)
          this.fetchItems()
          this.$notify({
            message: 'Ключь успешно обновлен!',
            customClass: 'success-notyfy'
          })
        } else {
          return false
        }
      })
    },
    copyToBuffer(apiKey) {
      writeText(apiKey)
      this.$notify({
        message: 'API ключ успешно скопирован в буфер обмена',
        customClass: 'success-notyfy'
      })
    },
    async removeAPIKey(item) {
      try {
        await this.$axios.$delete('/api/v1/settings/api-key/remove/' + item._id)
        this.fetchItems()
        this.$notify({
          message: 'Ключь успешно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },
    async fetchItems() {
      try {
        const result = await this.$axios.$get('/api/v1/settings/api-key/getall')
        this.items = result.data
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      }
    },
    generateAPIKey() {
      this.form.key = md5(Date())
    },
    clearForm() {
      this.form.comments = ''
      this.form.key = ''
    }
  }
}
</script>
