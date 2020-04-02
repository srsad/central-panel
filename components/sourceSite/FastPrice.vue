<template>
  <div>
    <el-table :data="fastPrice" stripe style="width: 100%">
      <el-table-column prop="pTitle" label="Наименование">
        <template slot-scope="scope">
          <b class="color-000">{{ scope.row.pTitle }} мин.</b>
        </template>
      </el-table-column>
      <el-table-column prop="pTime" label="Врем ремонта">
        <template slot="header">
          <div class="cell text-center">Врем ремонта</div>
        </template>
        <template slot-scope="scope">
          <div class="text-center">{{ scope.row.pTime }} мин.</div>
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
  computed: {
    fastPrice() {
      return this.$store.getters['source/page/fastPrice']
    }
  }
}
</script>
