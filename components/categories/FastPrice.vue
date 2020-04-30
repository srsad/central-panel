<template>
  <div>
    <el-table :data="fastPrice" stripe style="width: 100%">
      <el-table-column prop="pTitle" label="Наименование">
        <template slot-scope="scope">
          <el-popover
            v-if="scope.row.isParts"
            placement="top-start"
            trigger="hover"
            content="Данные взяты из списка деталей"
          >
            <!-- eslint-disable-next-line vue/no-template-shadow -->
            <b slot="reference" class="color-000 partListCell__desc">
              {{ scope.row.pTitle }}
            </b>
          </el-popover>
          <b v-else class="color-000">{{ scope.row.pTitle }}</b>
        </template>
      </el-table-column>
      <el-table-column prop="pTime" label="Врем ремонта">
        <template slot="header">
          <div class="cell text-center">Врем ремонта</div>
        </template>
        <template slot-scope="scope">
          <div class="text-center">{{ scope.row.pTime | toTime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="pPrice" label="Цена">
        <template slot-scope="scope">
          <div>{{ scope.row.pPrice }} руб.</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    toTime(val) {
      if (val && parseInt(val)) return val + ' мин.'
    }
  },
  computed: {
    fastPrice() {
      return this.$store.getters['source/page/fastPrice']
    }
  }
}
</script>
