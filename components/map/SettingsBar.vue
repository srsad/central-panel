<template>
  <div>
    <div class="block">
      <!-- date-picker -->
      <el-date-picker
        v-model="dateRange"
        @change="onChange"
        first-day-of-week="1"
        type="daterange"
        format="yyyy/MM/dd"
        value-format="yyyyMMdd"
        range-separator="-"
        start-placeholder="От"
        end-placeholder="До"
      />
      <!-- end date-picker -->
      <!-- select -->
      <el-select v-model="city" placeholder="Город">
        <el-option
          v-for="item in this.$store.getters['map/cityes']"
          :key="item.city"
          :label="item.city"
          :value="item.city"
        />
      </el-select>
      <!-- end select -->
      <el-button
        :disabled="disabled"
        :loading="loading"
        @click="getPoints"
        type="success"
        class="ml-15"
      >
        Применить
      </el-button>

      <span class="ml-15">
        Всего: <b>{{ this.$store.getters['map/pointLength'] }}</b>
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      loading: false,
      dateRange: [
        moment(Date.now()).format('YYYYMMDD'),
        moment(Date.now()).format('YYYYMMDD')
      ],
      settings: {
        apiKey: '65ee8b15-0d5d-45a9-b270-25a4baf7280f',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      },
      coords: [54.82896654088406, 39.831893822753904],
      city: 'Санкт-петербург'
    }
  },
  computed: {
    disabled() {
      return !(Array.isArray(this.dateRange) && this.city)
    }
  },
  methods: {
    onChange(data) {
      this.$store.dispatch('map/setDateRange', data)
    },
    async getPoints() {
      this.loading = true
      try {
        await this.$store.dispatch('map/fetchPonits')
      } catch (e) {
        //
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
