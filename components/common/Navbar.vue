<template>
  <el-dropdown @command="handleCommand" trigger="click">
    <el-button type="primary" size="mini">
      <span class="navFullname">{{ $store.state.auth.fullname }}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown" router>
      <el-dropdown-item command="/profile" icon="fa fa-user-o">
        Мой профиль
      </el-dropdown-item>
      <el-dropdown-item command="logout" icon="fa fa-sign-out" divided>
        Выход
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(data) {
      if (data === 'logout') {
        this.$store.dispatch('auth/logout')
        this.$router.push('/auth')
      } else {
        this.$router.push(data)
      }
    }
  }
}
</script>
