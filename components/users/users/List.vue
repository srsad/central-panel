<template>
  <el-table :data="tableData" stripe class="w100">
    <el-table-column prop="login" label="Логин" />
    <el-table-column prop="fullname" label="ФИО" />
    <el-table-column prop="email" label="Email" />
    <el-table-column prop="role" label="Роль" />
    <el-table-column prop="date" label="Дата создания" />
    <el-table-column label="Действия" label-class-name="text-center">
      <template slot-scope="scope">
        <div class="text-center">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            size="mini"
            icon="el-icon-edit"
          />

          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
          />
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
          login: 'Login 1',
          fullname: 'Tom 1',
          email: 'email1@gmail.com',
          role: 'Роль 1',
          date: '2016-05-03'
        },
        {
          login: 'Login 2',
          fullname: 'Tom 2',
          email: 'email2@gmail.com',
          role: 'Роль 2',
          date: '2016-05-02'
        },
        {
          login: 'Login 3',
          fullname: 'Tom 3',
          email: 'email3@gmail.com',
          role: 'Роль 3',
          date: '2016-05-04'
        },
        {
          login: 'Login 4',
          fullname: 'Tom 4',
          email: 'email4@gmail.com',
          role: 'Роль 4',
          date: '2016-05-01'
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
