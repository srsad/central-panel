<template>
  <div>
    <div v-for="(item, idx) of items" :key="idx">
      <h4>{{ item.name }}</h4>
      <!-- {{ items[idx].schedules }} -->
      <!-- {{ item }} -->
      <el-table :data="item.schedules" style="width: 100%">
        <!-- Сотрудник -->
        <el-table-column prop="employee" label="Сотрудник" width="250">
          <template slot-scope="scope">
            <el-input v-model="scope.row.employee" size="mini" />
          </template>
        </el-table-column>
        <!-- /Сотрудник -->
        <!-- Пн -->
        <el-table-column prop="monday" label="Пн">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.monday"
              :class="[scope.row.monday || 'bg-3a3']"
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- /Пн -->
        <!-- Вт -->
        <el-table-column prop="tuesday" label="Вт">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.tuesday"
              :class="[scope.row.tuesday || 'bg-3a3']"
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- /Вт -->
        <!-- Ср -->
        <el-table-column prop="wednesday" label="Ср">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.wednesday"
              :class="[scope.row.wednesday || 'bg-3a3']"
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- /Ср -->
        <!-- Чт -->
        <el-table-column prop="thursday" label="Чт">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.thursday"
              :class="[scope.row.thursday || 'bg-3a3']"
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- /Чт -->
        <!-- Пт -->
        <el-table-column prop="friday" label="Пт">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.friday"
              :class="[scope.row.friday || 'bg-3a3']"
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- /Пт -->
        <!-- Сб -->
        <el-table-column prop="saturday" label="Сб">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.saturday"
              :class="[scope.row.saturday || 'bg-3a3']"
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- /Сб -->
        <!-- Вс -->
        <el-table-column prop="sunday" label="Вс">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.sunday"
              :class="[scope.row.sunday || 'bg-3a3']"
              size="mini"
            />
          </template>
        </el-table-column>
        <!-- /Вс -->
        <!-- Номер -->
        <el-table-column prop="phone" label="Номер" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.phone" size="mini" />
          </template>
        </el-table-column>
        <!-- /Номер -->
        <!-- События -->
        <el-table-column label="События" width="90">
          <template slot-scope="scope">
            <el-button
              @click="removeEmployee(item, idx, scope.$index)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              title="Удалить сотрудника"
            />
          </template>
        </el-table-column>
        <!-- /События -->
      </el-table>
      <!-- printTable -->
      <!--  -->
      <div style="display: none;">
        <table :id="`print-${item._id}`" border="1">
          <thead>
            <th style="width:200px;padding:2px">Сотрудник</th>
            <th style="width:70px;padding:2px">Пн</th>
            <th style="width:70px;padding:2px">Вт</th>
            <th style="width:70px;padding:2px">Ср</th>
            <th style="width:70px;padding:2px">Чт</th>
            <th style="width:70px;padding:2px">Пт</th>
            <th style="width:70px;padding:2px">Сб</th>
            <th style="width:70px;padding:2px">Вс</th>
            <th style="width:150px;padding:2px">Номер</th>
          </thead>
          <tbody>
            <tr v-for="(el, i) in item.schedules" :key="i">
              <td style="padding:2px">{{ el.employee }}</td>
              <td style="padding:2px">{{ el.monday || '-' }}</td>
              <td style="padding:2px">{{ el.tuesday || '-' }}</td>
              <td style="padding:2px">{{ el.wednesday || '-' }}</td>
              <td style="padding:2px">{{ el.thursday || '-' }}</td>
              <td style="padding:2px">{{ el.friday || '-' }}</td>
              <td style="padding:2px">{{ el.saturday || '-' }}</td>
              <td style="padding:2px">{{ el.sunday || '-' }}</td>
              <td style="padding:2px">{{ el.phone || '-' }}</td>
            </tr>
            <tr>
              <td style="padding:2px">Сотрудников в смене</td>
              <td style="padding:2px">{{ item.result.monday }}</td>
              <td style="padding:2px">{{ item.result.tuesday }}</td>
              <td style="padding:2px">{{ item.result.wednesday }}</td>
              <td style="padding:2px">{{ item.result.thursday }}</td>
              <td style="padding:2px">{{ item.result.friday }}</td>
              <td style="padding:2px">{{ item.result.saturday }}</td>
              <td style="padding:2px">{{ item.result.sunday }}</td>
              <td style="padding:2px"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /printTable -->
      <!--  -->
      <div class="text-center mt-10 mb-30">
        <el-button
          @click="addEmployee(idx)"
          :loading="loading"
          size="mini"
          type="success"
          icon="el-icon-plus"
          title="Добавить сотрудника"
        >
          Добавить сотрудника
        </el-button>
        <el-button
          @click="saveTable(idx)"
          :loading="loading"
          size="mini"
          type="primary"
          icon="fa fa-floppy-o"
          title="Сохранить таблицу"
        >
          Сохранить таблицу
        </el-button>
        <el-button
          @click="removeTable(idx)"
          :loading="loading"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          title="Удалить таблицу"
        >
          Удалить таблицу
        </el-button>
        <el-button
          @click.prevent="printTable(`print-${item._id}`)"
          :loading="loading"
          size="mini"
          type="info"
          icon="el-icon-printer"
          title="Печать"
        >
          Печать
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import Print from 'print-js'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    /**
     * Добавить сотрудника
     */
    addEmployee(idx) {
      this.items[idx].schedules.push({
        employee: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
        phone: ''
      })
    },

    /**
     * Удалить сотрудника
     */
    removeEmployee(item, itemIdx, idx) {
      if (this.items[itemIdx].schedules.length === 1) return false
      this.items[itemIdx].schedules.splice(idx, 1)
    },

    /**
     * Сохранить таблицу
     */
    async saveTable(idx) {
      this.loading = true
      try {
        const fd = this.items[idx]
        const scheduleId = fd._id
        let monday = 0
        let tuesday = 0
        let wednesday = 0
        let thursday = 0
        let friday = 0
        let saturday = 0
        let sunday = 0

        fd.schedules.forEach((el) => {
          if (el.monday) monday++
          if (el.tuesday) tuesday++
          if (el.wednesday) wednesday++
          if (el.thursday) thursday++
          if (el.friday) friday++
          if (el.saturday) saturday++
          if (el.sunday) sunday++
        })

        fd.result.monday = monday
        fd.result.tuesday = tuesday
        fd.result.wednesday = wednesday
        fd.result.thursday = thursday
        fd.result.friday = friday
        fd.result.saturday = saturday
        fd.result.sunday = sunday

        console.log('fd', fd)

        await this.$axios.$put(
          `/api/v1/report/schedule/update/${scheduleId}`,
          fd
        )

        this.$notify({
          message: 'Данные сохранены!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        await this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * Удалить таблицу
     */
    async removeTable(idx) {
      this.loading = true
      try {
        const scheduleId = this.items[idx]._id
        await this.$axios.$delete(
          `/api/v1/report/schedule/remove/${scheduleId}`
        )
        this.items.splice(idx, 1)
        this.$notify({
          message: 'Таблица удаленна!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },

    /**
     * Распечатать таблицу
     */
    printTable(tableId) {
      // eslint-disable-next-line
      const printJs = require('print-js')
      // eslint-disable-next-line
      printJS(tableId, 'html')
    }
  }
}
</script>
