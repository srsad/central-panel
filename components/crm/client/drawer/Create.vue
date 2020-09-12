<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerCreateClient"
    :before-close="onClose"
    width="35%"
    title="Новый клиент"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row"
    >
      <!-- ceditor -->
      <el-form-item class="col-lg-5" prop="ceditor">
        <el-radio-group v-model="form.ceditor" size="mini">
          <el-radio-button label="individual">Физ. лицо</el-radio-button>
          <el-radio-button label="company">Компания</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- /ceditor -->
      <!-- supplier -->
      <el-form-item class="col-lg-3" prop="supplier">
        <el-checkbox v-model="form.checked">
          <i class="fa fa-car" />
          Поставщик
        </el-checkbox>
      </el-form-item>
      <!-- /supplier -->
      <!-- conflicted -->
      <el-form-item class="col-lg-4" prop="conflicted">
        <el-checkbox v-model="form.conflicted">
          <i class="fa fa-frown-o color-red" />
          Конфликтный
        </el-checkbox>
      </el-form-item>
      <!-- /conflicted -->
      <!-- name -->
      <el-form-item
        :label="
          form.ceditor === 'individual' ? 'Имя клиента' : 'Название компании'
        "
        prop="name"
        class="col-md-7"
      >
        <el-input v-model="form.name" size="mini" />
      </el-form-item>
      <!-- /name -->
      <!-- email -->
      <el-form-item class="col-md-5" label="Email" prop="email">
        <el-input v-model="form.email.email" size="mini" />
        <el-checkbox
          v-model="form.email.send_email"
          label="Согласен получать Email"
        />
      </el-form-item>
      <!-- /email -->
      <!--  -->
      <el-form-item class="col-12" prop="phone">
        <div v-for="(item, idx) of form.phone" :key="idx">
          <el-input
            v-model="form.phone[idx].phone"
            v-mask="'8(###)###-##-##'"
            size="mini"
          >
            <template slot="append">
              <el-select
                v-model="form.phone[idx].contact_type"
                size="mini"
                style="width:130px;padding:5px 0px 5px 0;margin:-10px 0 -10px -25px;"
              >
                <el-option value="mobile" label="Мобильный" />
                <el-option value="worker" label="Рабочий" />
                <el-option value="home" label="Домашний" />
              </el-select>
            </template>
            <template slot="append">
              <el-popover
                placement="top"
                trigger="hover"
                content="Согласен получать SMS"
              >
                <el-checkbox
                  slot="reference"
                  v-model="form.phone[idx].send_sms"
                  size="mini"
                  style="width:50px;margin-bottom:0;"
                >
                  <i class="el-icon-message" />
                </el-checkbox>
              </el-popover>
            </template>
            <template slot="append">
              <el-button
                @click="addNumber"
                size="mini"
                icon="el-icon-plus"
                title="Добавить номер"
                style="margin:-12px;"
              />
            </template>
            <template slot="append">
              <el-button
                @click="removeNumber(idx)"
                size="mini"
                icon="el-icon-delete"
                title="Удалить номер"
              />
            </template>
          </el-input>
        </div>
        <!--  -->
      </el-form-item>
      <!-- / -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">Закрыть</el-button>
      <el-button @click="validateForm" type="success">Создать</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        ceditor: 'individual',
        checked: '',
        conflicted: '',
        name: '',
        phone: [
          {
            contact_type: 'mobile',
            phone: '',
            send_sms: false
          }
        ],
        email: {
          email: '',
          send_email: false
        }
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите имя',
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: this.validateEmail,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: this.validatePhone,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.onCreate()
      })
    },
    onCreate() {},
    onClose() {
      this.$confirm('Отменить создание нового клиента?')
        .then((_) => {
          this.$store.commit('settings/SWITCH_DRAWNER', {
            dranwer: 'drawerCreateClient',
            status: false
          })
          // eslint-disable-next-line
          done()
        })
        .catch((_) => {})
    },
    clearForm() {
      this.form.name = ''
      this.form.source = ''
      this.form.company = ''
      this.form.brand = ''
      this.form.published = true
      this.form.image = ''
    },
    /**
     * Добавить еще один номер
     */
    addNumber() {
      this.form.phone.push({
        contact_type: 'mobile',
        phone: '',
        send_sms: false
      })
    },
    /**
     * Удалить номер
     */
    removeNumber(idx) {
      if (this.form.phone.length <= 1) return false
      this.form.phone.splice(idx, 1)
    },
    /**
     * Валидация email
     */
    validateEmail(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else {
        callback()
      }
    },
    /**
     * Валидация email
     */
    validatePhone(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else {
        callback()
      }
    }
  }
}
</script>
