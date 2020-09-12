<template>
  <div class="row">
    <div class="col-12">
      <el-form
        ref="typeRequest"
        v-if="$abilities('crm-type_request-create')"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="name">
          <el-input v-model="form.name" size="mini" placeholder="Тип заявки" />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            @click="addValidate('typeRequest')"
            size="mini"
            type="success"
            icon="el-icon-plus"
            title="Создать новый тип заявки"
          />
        </el-form-item>
      </el-form>
    </div>
    <!--  -->
    <div v-if="items.length === 0" class="col-12">
      <h5>Список пуст</h5>
    </div>
    <div v-else v-for="(item, idx) of items" :key="idx" class="col-12">
      <div class="row">
        <div class="col-12">
          <el-form
            :ref="`typeRequest${idx}`"
            :inline="true"
            :model="items[idx]"
            :disabled="loading"
            :rules="rules"
          >
            <el-form-item prop="name">
              <el-input
                v-model="items[idx].name"
                size="mini"
                placeholder="Тип заявки"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="$abilities('crm-type_request-update')"
                :loading="loading"
                @click="update(`typeRequest${idx}`, items[idx])"
                size="mini"
                title="Редактировать"
                type="primary"
                icon="fa fa-floppy-o"
              />
            </el-form-item>
            <!--  -->
            <el-form-item>
              <el-popconfirm
                v-if="$abilities('crm-type_request-remove')"
                @onConfirm="remove(items[idx])"
                title="Удалить тип заявки?"
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
            </el-form-item>
            <!--  -->
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        name: ''
      },
      items: [],
      rules: {
        name: [
          {
            required: true,
            message: 'Введите тип, например "СЦ"',
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
    this.fetchItems()
  },
  methods: {
    addValidate(data) {
      this.$refs[data].validate((valid) => {
        if (!valid) return false
        this.onCreate()
      })
    },
    async onCreate() {
      this.loading = true
      try {
        const formData = this.form
        await console.log('typeRequest', formData)
        await this.$store.dispatch('crm/typeRequest/create', formData)
        this.fetchItems()
        this.$notify({
          message: 'Тип заявки успешно создан!',
          customClass: 'success-notyfy'
        })
        this.clearForm()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    async update(form, data) {
      this.loading = true
      await this.$refs[form][0].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('crm/typeRequest/update', data)
          this.fetchItems()
          this.$notify({
            message: 'Тип заявки успешно обновлен!',
            customClass: 'success-notyfy'
          })
          this.loading = false
        } else {
          this.loading = false
          return false
        }
      })
    },
    async remove(item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/crm/type-request/remove/' + item._id)
        this.fetchItems()
        this.$notify({
          message: 'Тип заявки успешно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    async fetchItems() {
      try {
        // загрузка данных
        // if (this.$store.state.crm.typeRequest.fetchItems.length === 0) {
        //   await this.$store.dispatch('crm/typeRequest/fetchItems')
        // }
        await this.$store.dispatch('crm/typeRequest/fetchItems')

        this.items = JSON.parse(
          JSON.stringify(this.$store.getters['crm/typeRequest/typeRequests'])
        )
      } catch (e) {}
    },
    clearForm() {
      this.form.name = ''
    }
  }
}
</script>
