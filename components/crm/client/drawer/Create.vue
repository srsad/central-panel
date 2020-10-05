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
        <el-checkbox v-model="form.supplier">
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
        <el-autocomplete
          v-model="form.name"
          :fetch-suggestions="dadataName"
          size="mini"
          class="w100"
        >
          <template slot-scope="{ item }">
            <div class="value">{{ item.value }}</div>
          </template>
        </el-autocomplete>
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
      <!--  -->
      <el-form-item
        v-for="(item, idx) in form.address"
        :key="idx"
        class="col-12"
      >
        <el-autocomplete
          v-model="form.address[idx].address"
          :fetch-suggestions="dadataAddress"
          placeholder="Адрес"
          size="mini"
          class="w100"
        >
          <template slot-scope="{ item }">
            <div class="value">{{ item.value }}</div>
          </template>
          <div slot="append">
            <el-button
              @click="addAddress(idx)"
              size="mini"
              icon="el-icon-plus"
              title="Добавить адрес"
            />
            <el-button
              v-if="idx > 0"
              @click="removeAddress(idx)"
              size="mini"
              icon="el-icon-delete"
              title="Удалить адрес"
            />
          </div>
        </el-autocomplete>
      </el-form-item>
      <!--  -->
      <el-form-item class="col-12" prop="notes" label="Примечание">
        <el-input
          v-model="form.notes"
          :autosize="{ minRows: 2 }"
          type="textarea"
          size="mini"
        />
      </el-form-item>
      <!--  -->
      <el-form-item class="col-12" prop="tags">
        <div slot="label">
          <i class="el-icon-price-tag" />
          Теги
        </div>
        <div>
          <el-tag
            v-for="tag in form.tags"
            :key="tag"
            :disable-transitions="false"
            @close="removeTag(tag)"
            closable
          >
            {{ tag }}
          </el-tag>
          <el-input
            ref="saveTagInput"
            v-if="tagVisible"
            v-model="tagValue"
            @blur="addTag"
            @keyup.enter.native="addTag"
            size="mini"
            class="input-new-tag"
          />
          <el-button
            v-else
            @click="showInput"
            size="small"
            class="button-new-tag"
          >
            + Тег
          </el-button>
        </div>
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
import Dadata from 'dadata-suggestions'
const dadata = new Dadata(process.env.DADATA_API_KEY)

export default {
  data() {
    return {
      loading: false,
      tagVisible: false,
      tagValue: '',
      form: {
        ceditor: 'individual',
        supplier: false,
        conflicted: false,
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
        },
        address: [
          {
            address: '',
            lat: '',
            long: ''
          }
        ],
        notes: '',
        tags: []
      }
    }
  },
  computed: {
    rules() {
      const rules = {
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

      // eslint-disable-next-line
      rules.name[0].message = this.form.ceditor === 'individual' ? 'Введите имя' : 'Введите название организации'

      return rules
    }
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.onCreate()
      })
    },
    /**
     * Создание нового клиента
     */
    async onCreate() {
      this.loading = true
      try {
        await this.$axios.$post('/api/v1/crm/clients/create', this.form)
        await this.$notify({
          message: 'Клиент добавлен!',
          customClass: 'success-notyfy'
        })
        this.$store.commit('settings/SWITCH_DRAWNER', {
          dranwer: 'drawerCreateClient',
          status: false
        })
        this.clearForm()
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    /**
     * Отменить создание нового клиента
     */
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
      this.form.ceditor = 'individual'
      this.form.supplier = false
      this.form.conflicted = false
      this.form.phone = [
        {
          contact_type: 'mobile',
          phone: '',
          send_sms: false
        }
      ]
      this.form.email = {
        email: '',
        send_email: false
      }
      this.form.address = [
        {
          address: '',
          lat: '',
          long: ''
        }
      ]
      this.form.notes = ''
      this.form.tags = []
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
     * Добавить адрес
     */
    addAddress(idx) {
      this.form.address.push({
        address: '',
        lat: '',
        long: ''
      })
    },
    /**
     * Удалить адрес
     */
    removeAddress(idx) {
      if (this.form.address.length <= 1) return false
      this.form.address.splice(idx, 1)
    },
    /**
     * Добавить тег
     */
    addTag(tag) {
      if (this.tagValue) this.form.tags.push(this.tagValue)
      this.tagVisible = false
      this.tagValue = ''
    },
    /**
     * Открыть инпут нового тега
     */
    showInput() {
      this.tagVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    /**
     * Удалить тег
     */
    removeTag(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1)
    },
    /**
     * dadata по ФИО
     */
    async dadataName(val, cb) {
      try {
        const params = this.form.ceditor === 'individual' ? 'fio' : 'party'
        const { suggestions } = await dadata[params]({ query: val })
        cb(suggestions)
      } catch (e) {}
    },
    /**
     * dadata по адресу
     */
    async dadataAddress(val, cb) {
      try {
        const { suggestions } = await dadata.address({ query: val })
        cb(suggestions)
      } catch (e) {}
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
