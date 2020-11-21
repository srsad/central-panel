<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerCreateOrder"
    :before-close="onClose"
    @open="onOpen"
    title="Новый заказ"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      label-position="top"
      class="row"
    >
      <div class="col-12">
        <h4>Клиент</h4>
      </div>
      <el-form-item class="col-md-6" label="Тип заказа" prop="type_request">
        <el-select v-model="form.type_request" class="w100" size="mini">
          <el-option
            v-for="(item, idx) in typeRequests"
            :key="idx"
            :value="item._id"
            :label="item.name"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-6" label="Клиент" prop="client">
        <el-autocomplete
          v-model="clientName"
          :value-key="form.client"
          :fetch-suggestions="queryClients"
          @select="selectClient"
          popper-class="input-client"
          placeholder="ФИО/название организации"
          class="w100"
          size="mini"
        >
          <i
            slot="suffix"
            @click="createClient"
            title="Новый клиент"
            class="el-icon-plus cursor-pointer"
          />
          <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
            <div class="phones">
              <span v-for="(phone, idx) in item.phone" :key="idx" class="phone">
                {{ phone.phone | VMask('8(###)###-##-##') }}
              </span>
            </div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-8" prop="address">
        <el-autocomplete
          v-model="clientAddress"
          :fetch-suggestions="queryAddress"
          popper-class="input-client"
          placeholder="Адрес"
          class="w100"
          size="mini"
        />
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-4" prop="phone">
        <el-autocomplete
          v-model="clientPhone"
          :fetch-suggestions="queryPhone"
          @select="selectClient"
          v-mask="'8(###)###-##-##'"
          popper-class="input-clientPhone"
          placeholder="Номер телефона"
          class="w100"
          size="mini"
        >
          <template slot-scope="{ item }">
            <div class="phones">
              <span v-for="(phone, idx) in item.phone" :key="idx" class="phone">
                {{ phone.phone | VMask('8(###)###-##-##') }}
              </span>
            </div>
            <div class="name">{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <!--  -->
      <div class="col-12">
        <h4>Изделие и неисправности</h4>
      </div>
      <!--  -->
      <el-form-item class="col-md-4" prop="brand" label="Бренд">
        <el-autocomplete
          v-model="brand"
          :value-key="form.brand"
          :fetch-suggestions="queryBrand"
          @select="selectBrand"
          @change="selectBrand"
          placeholder="Бренд"
          class="w100"
          size="mini"
        >
          <template slot-scope="{ item }">
            <div>{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-4" prop="device_type" label="Тип устройства">
        <el-autocomplete
          v-model="device_type"
          :value-key="form.device_type"
          :fetch-suggestions="queryDeviceType"
          @select="selectDeviceType"
          @change="selectDeviceType"
          placeholder="Тип устройства"
          class="w100"
          size="mini"
        >
          <template slot-scope="{ item }">
            <div>{{ item.name }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-4" prop="model" label="Модель">
        <el-input
          v-model="form.model"
          placeholder="Модель"
          class="w100"
          size="mini"
        />
        <!-- <el-select
          v-model="form.model"
          filterable
          placeholder="Модель"
          size="mini"
          class="w100"
        >
          <el-option v-for="(item, idx) in models" :key="idx" :value="item.value" />
        </el-select> -->
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-4" prop="serial" label="Серийный номер">
        <el-input
          v-model="form.serial"
          class="w100"
          placeholder="Серийный номер"
          size="mini"
        />
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-4" prop="password" label="Пароль">
        <el-input
          v-model="form.password"
          class="w100"
          placeholder="Пароль"
          size="mini"
        />
      </el-form-item>
      <!--  -->
      <el-form-item class="col-md-4" prop="color" label="Цвет">
        <el-input
          v-model="form.color"
          class="w100"
          placeholder="Цвет"
          size="mini"
        />
      </el-form-item>
      <!--  -->
      <el-form-item class="col-12" prop="malfunctions" label="Неисправности">
        <el-select
          v-model="form.malfunctions"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Неисправности"
          class="w100"
          size="mini"
        >
          <el-option
            v-for="item in malfunctions"
            :key="item._id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item
        class="col-6"
        prop="appearance"
        label="Внешний вид - через зарятую"
      >
        <el-input v-model="form.appearance" size="mini" class="w100" />
      </el-form-item>
      <!--  -->
      <el-form-item
        class="col-6"
        prop="packagelist"
        label="Комплектация - через зарятую"
      >
        <el-input v-model="form.packagelist" size="mini" class="w100" />
      </el-form-item>
      <!--  -->
      <div class="col-12">
        <h4>Дополнительная информация</h4>
      </div>
      <!--  -->
      <div class="col-6">
        <el-form-item prop="will_done_at" label="Дата готовности">
          <vue-ctk-date-time-picker
            v-model="form.will_done_at"
            :no-label="true"
            :no-button-now="true"
            :format="'DD.MM.YYYY HH:mm'"
            :formatted="'DD.MM.YYYY HH:mm'"
            :output-format="'DD.MM.YYYY HH:mm'"
            :min-date="minDate"
            input-size="sm"
            label=""
          />
        </el-form-item>
        <!--  -->
        <el-form-item prop="manager_notes" label="Заметки приемщика">
          <el-input
            v-model="form.manager_notes"
            size="mini"
            class="w100"
            type="textarea"
            maxlength="255"
            show-word-limit
          />
        </el-form-item>
      </div>
      <!--  -->
      <div class="col-6">
        <el-form-item prop="free_diagnostics" class="mb-0">
          <el-checkbox v-model="form.free_diagnostics" class="w100 mb-0">
            Объявлена бесплатная диагностика
          </el-checkbox>
        </el-form-item>
        <el-form-item prop="replacement_device" class="mb-0">
          <el-checkbox v-model="form.replacement_device" class="w100 mb-0">
            Выдано подменное устройство
          </el-checkbox>
        </el-form-item>
        <el-form-item prop="urgently" class="mb-0">
          <el-checkbox v-model="form.urgently" class="w100 mb-0">
            Срочно
          </el-checkbox>
        </el-form-item>
      </div>
      <!--  -->
      <div class="col-6">
        <el-form-item prop="manager" label="Менеджер">
          <el-select v-model="form.manager" size="mini" class="w100">
            <el-option
              v-for="(item, idx) in managers"
              :key="idx"
              :label="item.fullname"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item
          prop="performer_in_charge"
          label="Ответственный исполнитель"
        >
          <el-select
            v-model="form.performer_in_charge"
            size="mini"
            class="w100"
          >
            <el-option
              v-for="(item, idx) in managers"
              :key="idx"
              :label="item.fullname"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
      </div>
      <!--  -->
      <div class="col-6">
        <el-form-item prop="prepayment" label="Предоплата">
          <el-input-number
            v-model="form.prepayment"
            :min="0"
            controls-position="right"
            size="mini"
            class="w100"
          />
        </el-form-item>
        <el-form-item prop="status" label="Статус">
          <el-select v-model="form.status" size="mini" class="w100">
            <el-option
              v-for="(item, idx) in statuses"
              :key="idx"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
      </div>
      <!--  -->
      <div class="col-12 text-right mt-15">
        <el-button
          @click.prevent="validateForm"
          type="success"
          icon="el-icon-plus"
        >
          Создать
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import Dadata from 'dadata-suggestions'
// const dadata = new Dadata(process.env.DADATA_API_KEY)
const dadata = new Dadata('05ede21fd19ece0776012846c39201f37d4ead36')

export default {
  data() {
    return {
      loading: false,
      clientName: '', // фио клиента для вывода
      clientAddress: '', // адрес клиента для вывода
      clientPhone: '', // номер клиента для вывода
      device_type: '', // тип устройства для вывода
      brand: '', // бренд для вывода
      malfunctions: [], // список неисправностей
      managers: [], // список менеджеров
      performers: [], // список исполнителей
      statuses: [], // список статусов
      form: {
        type_request: '5f7b89adda3af4001e9502f6', // СЦ
        client: '', // id клиента
        device_type: '',
        brand: '',
        model: '',
        serial: '',
        malfunctions: [],
        password: '',
        appearance: '',
        packagelist: '',
        manager_notes: '',
        free_diagnostics: false,
        original_parts: false,
        replacement_device: false,
        urgently: false,
        will_done_at: '',
        prepayment: '',
        manager: '',
        performer_in_charge: '',
        status: '5f55357fe6992a001e2735ea', // Предзаказ
        files: []
      }
    }
  },
  computed: {
    typeRequests() {
      return this.$store.getters['crm/typeRequest/typeRequests']
    },
    minDate() {
      return moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
    },
    rules() {
      const rules = {
        type_request: [
          {
            required: true,
            message: 'Введите тип',
            trigger: 'blur'
          }
        ],
        client: [
          {
            required: true,
            message: 'Необходимо заполнить',
            trigger: 'change'
          }
        ],
        device_type: [
          {
            required: true,
            message: 'Необходимо заполнить',
            trigger: 'change'
          }
        ],
        brand: [
          {
            required: true,
            message: 'Необходимо заполнить',
            trigger: 'change'
          }
        ],
        malfunctions: [
          {
            required: true,
            message: 'Необходимо заполнить',
            trigger: 'blur'
          }
        ],
        will_done_at: [
          {
            required: true,
            message: 'Необходимо заполнить',
            trigger: 'blur'
          }
        ],
        manager_notes: [
          {
            required: true,
            message: 'Необходимо заполнить',
            trigger: 'blur'
          }
        ]
      }

      return rules
    }
  },
  watch: {
    device_type(val, oldVal) {
      if (!val) this.form.device_type = ''
    },
    brand(val, oldVal) {
      if (!val) this.form.brand = ''
    }
  },
  async mounted() {
    // загрузка неисправностей
    if (this.$store.state.crm.malfunction.malfunctions.length <= 0) {
      await this.$store.dispatch('crm/malfunction/fetchItems')
    }
    this.malfunctions = this.$store.state.crm.malfunction.malfunctions

    // загрузка списка пользователей
    if (this.$store.getters['users/managers'].length <= 0) {
      await this.$store.dispatch('users/fetchUsers')
    }
    this.managers = this.$store.getters['users/managers']
    this.performers = this.$store.getters['users/performers']

    // загрузка списка статусов
    if (this.$store.getters['crm/status/requestStatus'].length <= 0) {
      await this.$store.dispatch('crm/status/fetchItems')
    }
    this.statuses = this.$store.getters['crm/status/requestStatus']
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        // this.onCreate()
      })
    },
    /**
     * При открытии
     */
    async onOpen() {
      await this.$store.dispatch('crm/typeRequest/fetchItems')
    },
    /**
     * При закрытии
     */
    onClose() {
      this.$confirm('Прекратить создание новой заявки?')
        .then((_) => {
          this.$store.commit('settings/SWITCH_DRAWNER', {
            dranwer: 'drawerCreateOrder',
            status: false
          })
          // eslint-disable-next-line
          done()
        })
        .catch((_) => {})
    },
    /**
     * Поиск адреса
     */
    async queryAddress(query, cb) {
      // eslint-disable-next-line
      if (query?.length <= 2) return cb([])
      try {
        const { suggestions } = await dadata.address({ query })
        console.log('dadataAddress', suggestions)
        cb(suggestions)
      } catch (e) {
        console.error('Не удалось получить список адресов', e.response)
      }
    },
    /**
     * Поиск пользователя по фио
     */
    async queryClients(query, cb) {
      const res = []
      if (query?.length <= 2) return cb(res)
      try {
        const { data } = await this.$axios.$get(
          '/api/v1/crm/clients/getbyname/' + query
        )
        return cb(data)
      } catch (e) {
        console.error(
          'Не удалось получить список клиентов',
          e.response.data.message
        )
      }
      cb(res)
    },
    /**
     * Поиск пользователя по номеру
     */
    async queryPhone(query, cb) {
      const res = []
      if (query?.length <= 2) return cb(res)
      try {
        const { data } = await this.$axios.$get(
          '/api/v1/crm/clients/getbyphone/' + query.match(/\d/gi).join('')
        )
        return cb(data)
      } catch (e) {
        console.error(
          'Не удалось получить список клиентов',
          e.response.data.message
        )
      }
      cb(res)
    },
    /**
     * Выбран клиент
     */
    selectClient(data) {
      // фио клиента
      this.clientName = data.name
      this.form.client = data._id
      // номер клиента
      this.clientPhone = data.phone[0].phone
      // адрес клиента
      this.clientAddress = data.address[0].address
    },
    /**
     * Тип устройства
     */
    async queryDeviceType(query, cb) {
      const res = []
      try {
        // есди пусто, то отдаем первые 20 позиций
        if (query?.length === 0) {
          // если в сторе еще не загружен список типов устройств
          if (this.$store.getters['crm/typeDevice/typeDevices'].length === 0) {
            await this.$store.dispatch('crm/typeDevice/fetchFirstItems')
          }
          return cb(this.$store.getters['crm/typeDevice/typeDevices'])
        }

        // в ином случаем используем поиск
        const { data } = await this.$axios.$get(
          '/api/v1/crm/type-device/getbydevicetype/' + query
        )
        return cb(data)
      } catch (e) {
        console.error(
          'Не удалось получить список типов устройств',
          e.response.data.message
        )
      }
      cb(res)
    },
    /**
     * Выбор типа устройства
     */
    selectDeviceType(data) {
      // если есть id, то ставлю его
      console.log('selectDeviceType', data)
      if (data?.name) {
        this.device_type = data.name
        this.form.device_type = data._id
      } else {
        // в ином записываю
        this.device_type = data
        this.form.device_type = data
      }
    },
    /**
     * Выборка бренда
     */
    async queryBrand(query, cb) {
      const res = []
      try {
        if (query?.length === 0) {
          // если в сторе еще не загружен список брендов
          if (this.$store.getters['report/brand/brands'].length === 0) {
            await this.$store.dispatch('report/brand/fetchItems')
          }
          return cb(this.$store.getters['report/brand/brands'])
        }

        // в ином случаем используем поиск
        const { data } = await this.$axios.$get(
          '/api/v1/report/brand/getbyname/' + query
        )
        return cb(data)
      } catch (e) {
        console.error(
          'Не удалось получить список брендов',
          e.response.data.message
        )
      }
      cb(res)
    },
    /**
     * Выбор бренда
     */
    selectBrand(data) {
      // если есть id, то ставлю его
      if (data?.name) {
        this.brand = data.name
        this.form.brand = data._id
      } else {
        // в ином записываю
        this.brand = data
        this.form.brand = data
      }
    },
    /**
     * Создать клиента
     */
    createClient() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCreateClient',
        status: true
      })
    }
  }
}
</script>
