<template>
  <el-table :data="tableData" class="w100">
    <el-table-column prop="role" label="Роль"> </el-table-column>
    <el-table-column prop="name" label="Кто создал"> </el-table-column>
    <el-table-column prop="date" label="Дата создания"> </el-table-column>
    <el-table-column label="Действия" label-class-name="text-center">
      <template slot-scope="scope">
        <div class="text-center">
          <el-tooltip content="Редактировать" placement="left">
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              size="mini"
              icon="el-icon-edit"
            />
          </el-tooltip>

          <el-tooltip content="Удалить" placement="right">
            <el-button
              @click="handleDelete(scope.$index, scope.row)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
            />
          </el-tooltip>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          role: 'Роль 1'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          role: 'Роль 2'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          role: 'Роль 3'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          role: 'Роль 4'
        }
      ]
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
