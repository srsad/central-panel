<template>
  <div class="row">
    <div class="col-12">
      <!--  -->
      <el-form ref="APIKeyForm" :inline="true" :model="form" :rules="rules">
        <el-form-item prop="comments">
          <el-input v-model="form.comments" placeholder="Комментарий" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.key" disabled placeholder="API ключ" />
        </el-form-item>
        <el-form-item>
          <el-popover
            placement="bottom-start"
            trigger="hover"
            content="Создать новый ключ"
          >
            <el-button
              slot="reference"
              :loading="loading"
              @click="addAPIKey('APIKeyForm')"
              type="success"
              icon="el-icon-plus"
            />
          </el-popover>
        </el-form-item>
      </el-form>
      <!--  -->
    </div>
    <!--  -->
    <div v-for="(item, idx) of items" :key="idx" class="col-12">
      <div class="row">
        <div class="col-12">
          <el-form
            :ref="`APIKeyForm${idx}`"
            :inline="true"
            :model="items[idx]"
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
              <el-popover
                placement="bottom-start"
                trigger="hover"
                content="Редактировать"
              >
                <el-button
                  slot="reference"
                  :loading="loading"
                  @click="updateAPIKey(`APIKeyForm${idx}`)"
                  type="primary"
                  icon="el-icon-edit"
                />
              </el-popover>
              <!--  -->
            </el-form-item>
            <el-form-item>
              <el-popconfirm
                @onConfirm="removeAPIKey(`APIKeyForm${idx}`)"
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
  props: {
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
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
      }
    }
  },
  mounted() {
    this.generateAPIKey()
  },
  methods: {
    addAPIKey(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.clearForm()
          this.generateAPIKey()
          console.log('sendForm!!')
        } else {
          return false
        }
      })
    },
    updateAPIKey(data) {
      this.$refs[data][0].validate((valid) => {
        if (valid) {
          // this.sendForm()
          // this.clearForm()
          // this.generateAPIKey()
          console.log('update!!')
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
    removeAPIKey(idx) {
      this.items.splice(idx, 1)
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
