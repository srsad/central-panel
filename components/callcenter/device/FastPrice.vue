<template>
  <div>
    <el-table :data="fastPrice" stripe style="width: 100%">
      <el-table-column prop="name" label="Наименование">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.isParts"
            placement="top-start"
            trigger="hover"
            content="Данные взяты из списка деталей"
          >
            <b slot="reference" class="color-000 partListCell__desc">
              {{ scope.row.name }}
            </b>
          </el-popover>
          <b v-else class="color-000">{{ scope.row.name }}</b>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="Врем ремонта">
        <template slot="header">
          <div class="cell text-center">Врем ремонта</div>
        </template>
        <template slot-scope="scope">
          <div class="text-center">{{ scope.row.time | toTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="Цена детали">
        <template slot="header">
          <div class="cell text-center">Цена детали</div>
        </template>
        <template slot-scope="scope">
          <div class="text-center">{{ scope.row.partPrice | toPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="pPrice" label="Цена">
        <template slot-scope="scope">
          <div>{{ scope.row.price | toPrice }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'FastPrice',

  filters: {
    toTime(val) {
      if (val && parseInt(val)) return val + ' мин.'
      return val
    },

    toPrice(val) {
      if (val && parseInt(val)) return val + ' руб.'
      return val
    }
  },

  props: {
    fastPrice: {
      type: Array,
      default: () => []
    }
  }
}
</script>
