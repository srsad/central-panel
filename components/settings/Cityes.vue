<template>
  <div class="row">
    <div class="col-12">
      <el-form
        ref="CityForm"
        v-if="$abilities('settings-city_panel-create')"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Город" />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            @click="addCity('CityForm')"
            type="success"
            icon="el-icon-plus"
            title="Создать новый ключ"
          />
        </el-form-item>
      </el-form>
    </div>
    <!--  -->
    <div v-if="items.length === 0" class="col-12">
      <h4>Пока городов нет</h4>
    </div>
    <div v-else v-for="(item, idx) of items" :key="idx" class="col-12">
      <div class="row">
        <div class="col-12">
          <el-form
            :ref="`CityForm${idx}`"
            :inline="true"
            :model="items[idx]"
            :disabled="loading"
            :rules="rules"
          >
            <el-form-item prop="name">
              <el-input v-model="items[idx].name" placeholder="Город" />
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="$abilities('settings-city_panel-update')"
                :loading="loading"
                @click="updateCity(`CityForm${idx}`, items[idx])"
                title="Редактировать"
                type="primary"
                icon="fa fa-floppy-o"
              />
            </el-form-item>
            <!--  -->
            <el-form-item>
              <el-popconfirm
                v-if="$abilities('settings-city_panel-remove')"
                @onConfirm="removeCity(items[idx])"
                title="Удалить данный город?"
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
      rules: {
        name: [
          {
            required: true,
            message: 'Введите город',
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
    this.fetchItems()
  },
  methods: {
    addCity(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.onCreate()
        } else {
          return false
        }
      })
    },
    async onCreate() {
      this.loading = true
      try {
        const formData = this.form
        await this.$store.dispatch('city/create', formData)
        this.fetchItems()
        this.$notify({
          message: 'Город успешно создан!',
          customClass: 'success-notyfy'
        })
        this.clearForm()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    async updateCity(form, data) {
      this.loading = true
      await this.$refs[form][0].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('city/update', data)
          this.fetchItems()
          this.$notify({
            message: 'Город успешно обновлен!',
            customClass: 'success-notyfy'
          })
          this.loading = false
        } else {
          this.loading = false
          return false
        }
      })
    },
    async removeCity(item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/settings/city/remove/' + item._id)
        this.fetchItems()
        this.$notify({
          message: 'Город успешно удален!',
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
        // загрузка городов
        await this.$store.dispatch('city/fetchItems')
        this.items = JSON.parse(
          JSON.stringify(await this.$store.getters['city/сityes'])
        )
      } catch (e) {}
    },
    clearForm() {
      this.form.name = ''
    }
  }
}
</script>
