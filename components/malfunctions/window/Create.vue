<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowCreateMalfunction"
    :before-close="onClose"
    width="35%"
    title="Добавить коллекцию неисправностей"
  >
    <el-form ref="form" :model="form" :disabled="loading" class="row m-15">
      <div class="col-12">
        <el-form-item
          :rules="rules.name"
          prop="name"
          label="Наименование коллекции"
        >
          <el-input
            v-model="form.name"
            size="mini"
            placeholder="Наименование коллекции"
          />
        </el-form-item>
      </div>
      <!--  -->
      <div class="col-12">
        <div
          v-for="(malfunction, idx) in form.malfunctions"
          :key="idx"
          class="row"
        >
          <el-form-item
            :prop="'malfunctions.' + idx + '.name'"
            :rules="rules.malfunctionName"
            class="col-5"
          >
            <el-input
              v-model="malfunction.name"
              size="mini"
              placeholder="Неисправность"
            />
          </el-form-item>
          <el-form-item
            :prop="'malfunctions.' + idx + '.price'"
            :rules="rules.malfunctionPrice"
            class="col-3"
          >
            <el-input
              v-model="malfunction.price"
              size="mini"
              placeholder="Цена"
            />
          </el-form-item>
          <el-form-item :prop="'malfunctions.' + idx + '.time'" class="col-2">
            <el-input
              v-model="malfunction.time"
              v-mask="'###'"
              size="mini"
              placeholder="Время"
            />
          </el-form-item>
          <div class="col-2 mt-5 text-right">
            <el-button
              @click="removeMalfunction(idx)"
              :loading="loading"
              size="mini"
              icon="el-icon-delete"
              type="danger"
            />
          </div>
        </div>
      </div>
      <div class="col-12 text-right mb-15">
        <el-button
          @click="addMalfunction"
          :loading="loading"
          size="mini"
          type="primary"
        >
          Добавить неисправность
        </el-button>
      </div>
      <!--  -->
      <div class="col-6">
        <el-checkbox v-model="form.hide">
          Скрыть из общего списка
        </el-checkbox>
      </div>
      <div class="col-6 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Создать
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateMalfunction',

  data() {
    return {
      loading: false,
      form: {
        name: '',
        hide: false,
        malfunctions: [
          {
            name: '',
            price: '',
            time: ''
          }
        ]
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Наименование коллекции',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Минимум 2 символа',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ],
        malfunctionName: [
          {
            required: true,
            message: 'Наименование неисправности',
            trigger: 'blur'
          },
          {
            min: 2,
            message: 'Минимум 2 символа',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ],
        malfunctionPrice: [
          {
            required: true,
            message: 'Цена',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    /**
     * Закрытие окна
     */
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'windowCreateMalfunction',
        status: false
      })
      this.clearForm()
    },

    validateForm() {
      this.$refs.form.validate((valid) => {
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
        await this.$store.dispatch('repair/malfunction/create', this.form)
        this.$store.dispatch('repair/malfunction/fetchItems')
        this.onClose()
        await this.$notify({
          message: 'Коллекция успушно добавлена!',
          customClass: 'success-notyfy'
        })
      } catch (error) {
        console.log('error', error)
      } finally {
        this.loading = false
      }
    },

    clearForm() {
      this.form.name = ''
      this.form.malfunctions = [
        {
          name: '',
          price: '',
          time: ''
        }
      ]
    },

    addMalfunction() {
      this.form.malfunctions.push({
        name: '',
        price: '',
        time: ''
      })
    },

    removeMalfunction(idx) {
      if (this.form.malfunctions.length > 1) {
        this.form.malfunctions.splice(idx, 1)
      }
    }
  }
}
</script>
