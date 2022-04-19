<template>
  <el-dialog
    :visible.sync="$store.state.settings.windowUpdateMalfunction"
    :before-close="onClose"
    @open="onOpen"
    :title="'Редактировать - ' + formData.name"
    width="35%"
  >
    <el-form ref="form" :model="formData" :disabled="loading" class="row m-15">
      <div class="col-12">
        <el-form-item
          :rules="rules.name"
          prop="name"
          label="Наименование коллекции"
        >
          <el-input
            v-model="formData.name"
            size="mini"
            placeholder="Наименование коллекции"
          />
        </el-form-item>
      </div>
      <!--  -->
      <div class="col-12">
        <div
          v-for="(malfunction, idx) in formData.malfunctions"
          :key="idx"
          class="row"
        >
          <el-form-item
            :prop="'malfunctions.' + idx + '.name'"
            :rules="rules.malfunctionName"
            class="col-5"
          >
            <el-input
              v-model.trim="malfunction.name"
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
              v-model.trim="malfunction.price"
              size="mini"
              placeholder="Цена"
            />
          </el-form-item>
          <el-form-item :prop="'malfunctions.' + idx + '.time'" class="col-2">
            <el-input
              v-model.trim="malfunction.time"
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
      <div class="col-12 text-right">
        <el-button @click="validateForm" :loading="loading" type="success">
          Обновить
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateMalfunction',

  data() {
    return {
      loading: false,
      formData: {
        name: '',
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
        dranwer: 'windowUpdateMalfunction',
        status: false
      })
      this.clearForm()
    },

    onOpen() {
      const item = this.$store.state.repair.malfunction.malfunction
      this.formData = JSON.parse(JSON.stringify(item))
    },

    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onUpdate()
        } else {
          return false
        }
      })
    },

    async onUpdate() {
      this.loading = true
      try {
        await this.$axios.$put(
          'api/v1/repair/malfunction/update/' + this.formData._id,
          this.formData
        )
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
      this.formData.name = ''
      this.formData.malfunctions = [
        {
          name: '',
          price: '',
          time: ''
        }
      ]
    },

    addMalfunction() {
      this.formData.malfunctions.push({
        name: '',
        price: '',
        time: ''
      })
    },

    removeMalfunction(idx) {
      if (this.formData.malfunctions.length > 1) {
        this.formData.malfunctions.splice(idx, 1)
      }
    }
  }
}
</script>
