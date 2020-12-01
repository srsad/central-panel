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
            <el-input v-model="scope.row.monday" size="mini" />
          </template>
        </el-table-column>
        <!-- /Пн -->
        <!-- Вт -->
        <el-table-column prop="tuesday" label="Вт">
          <template slot-scope="scope">
            <el-input v-model="scope.row.tuesday" size="mini" />
          </template>
        </el-table-column>
        <!-- /Вт -->
        <!-- Ср -->
        <el-table-column prop="wednesday" label="Ср">
          <template slot-scope="scope">
            <el-input v-model="scope.row.wednesday" size="mini" />
          </template>
        </el-table-column>
        <!-- /Ср -->
        <!-- Чт -->
        <el-table-column prop="thursday" label="Чт">
          <template slot-scope="scope">
            <el-input v-model="scope.row.thursday" size="mini" />
          </template>
        </el-table-column>
        <!-- /Чт -->
        <!-- Пт -->
        <el-table-column prop="friday" label="Пт">
          <template slot-scope="scope">
            <el-input v-model="scope.row.friday" size="mini" />
          </template>
        </el-table-column>
        <!-- /Пт -->
        <!-- Сб -->
        <el-table-column prop="saturday" label="Сб">
          <template slot-scope="scope">
            <el-input v-model="scope.row.saturday" size="mini" />
          </template>
        </el-table-column>
        <!-- /Сб -->
        <!-- Вс -->
        <el-table-column prop="sunday" label="Вс">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sunday" size="mini" />
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
      <!--  -->
      <!--  -->
      <div class="text-center mt-10 mb-30">
        <el-button
          @click="addEmployee(idx)"
          size="mini"
          type="success"
          icon="el-icon-plus"
          title="Добавить сотрудника"
        >
          Добавить сотрудника
        </el-button>
        <el-button
          @click="saveTable(idx)"
          size="mini"
          type="primary"
          icon="fa fa-floppy-o"
          title="Сохранить таблицу"
        >
          Сохранить таблицу
        </el-button>
        <el-button
          @click="removeTable(idx)"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          title="Удалить таблицу"
        >
          Удалить таблицу
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
        const scheduleId = this.items[idx]._id
        const fd = this.items[idx]
        await this.$axios.$put(
          `/api/v1/report/schedule/update/${scheduleId}`,
          fd
        )
        this.$notify({
          message: 'Данные сохранены!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
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
    }
  }
}
</script>
