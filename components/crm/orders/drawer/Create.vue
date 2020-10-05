<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerCreateOrder"
    :before-close="onClose"
    @open="onOpen"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      label-position="top"
      class="row"
    >
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
      <el-form-item class="col-md-6" label="Клиент" prop="client">
        <el-autocomplete
          v-model="form.client"
          :fetch-suggestions="queryClients"
          @select="selectClient"
          popper-class="my-autocomplete"
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
            <div class="value">{{ item.value }}</div>
            <span class="link">{{ item.link }}</span>
          </template>
        </el-autocomplete>
      </el-form-item>
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
export default {
  data() {
    return {
      loading: false,
      form: {
        type_request: '',
        client: '',
        device_type: '',
        brand: '',
        model: '',
        serial: '',
        malfunctions: '',
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
        files: []
      }
    }
  },
  computed: {
    typeRequests() {
      return this.$store.getters['crm/typeRequest/typeRequests']
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
            trigger: 'blur'
          }
        ]
      }

      return rules
    }
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
     * Поиск пользователя
     */
    queryClients(query, cb) {
      const res = []
      // const links = this.links;
      // const results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestion objects
      // eslint-disable-next-line
      cb(res)
    },
    /**
     * Выбран клиент
     */
    selectClient(data) {
      console.log('selectClient', data)
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
