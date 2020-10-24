<template>
  <div class="row">
    <div class="col-12">
      <el-form
        ref="malfunction"
        :inline="true"
        :disabled="loading"
        :model="form"
        :rules="rules"
        @submit.prevent.native="addValidate('malfunction')"
      >
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            @keyup.enter.native="addValidate('malfunction')"
            size="mini"
            placeholder="Неисправность"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            @click="addValidate('malfunction')"
            size="mini"
            type="success"
            icon="el-icon-plus"
            title="Создать неисправность"
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
            :ref="`malfunction${idx}`"
            :inline="true"
            :model="items[idx]"
            :disabled="loading"
            :rules="rules"
          >
            <el-form-item prop="name">
              <el-input
                v-model="items[idx].name"
                size="mini"
                placeholder="Неисправность"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                @click="update(`malfunction${idx}`, items[idx])"
                size="mini"
                title="Редактировать"
                type="primary"
                icon="fa fa-floppy-o"
              />
            </el-form-item>
            <!--  -->
            <el-form-item>
              <el-popconfirm
                @onConfirm="remove(items[idx])"
                title="Удалить неисправность?"
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
            message: 'Введите неисправность',
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
        await this.$store.dispatch('crm/malfunction/create', formData)
        this.fetchItems()
        this.$notify({
          message: 'Неисправность созданна!',
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
        if (!valid) return false
        this.loading = true
        try {
          await this.$store.dispatch('crm/malfunction/update', data)
          this.fetchItems()
          this.$notify({
            message: 'Неисправность обновленна!',
            customClass: 'success-notyfy'
          })
        } catch (e) {
          //
        } finally {
          this.loading = false
        }
      })
    },
    async remove(item) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/crm/malfunction/remove/' + item._id)
        this.fetchItems()
        this.$notify({
          message: 'Неисправность удаленна!',
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
        await this.$store.dispatch('crm/malfunction/fetchItems')
        this.items = JSON.parse(
          JSON.stringify(this.$store.getters['crm/malfunction/malfunctions'])
        )
      } catch (e) {}
    },
    clearForm() {
      this.form.name = ''
    }
  }
}
</script>
