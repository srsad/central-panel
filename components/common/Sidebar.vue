<template>
  <el-menu
    :collapse="$store.state.settings.isCollapse"
    :default-active="$route.path"
    router
    class="el-menu-vertical sticky-top"
    background-color="#304156"
    text-color="#bfcbd9"
  >
    <!-- content -->
    <!-- end content -->
    <el-menu-item
      @click="
        $store.dispatch(
          'settings/switchIsCollapse',
          !$store.state.settings.isCollapse
        )
      "
      class="color-fff"
    >
      <i class="el-icon-sort color-fff rotate-90" />
      <span slot="title">
        {{ $store.state.settings.isCollapse ? 'Открыть' : 'Скрыть' }}
      </span>
    </el-menu-item>
    <el-submenu index="companies">
      <template slot="title">
        <i class="fa fa-database" />
        <span slot="title">Компании</span>
      </template>
      <!--  -->
      <el-menu-item-group>
        <el-submenu index="rservice">
          <span slot="title">Rservice</span>
          <el-menu-item index="Canon1">Canon</el-menu-item>
          <el-menu-item index="Nicon1">Nicon</el-menu-item>
        </el-submenu>
        <el-submenu index="impuls">
          <span slot="title">Impuls</span>
          <el-menu-item index="Apple2">Apple</el-menu-item>
          <el-menu-item index="MSI2">MSI</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2-1">
      <span slot="title">Rservice</span>
      <el-menu-item index="2-1-1">Canon</el-menu-item>
      <el-menu-item index="2-1-2">Nicon</el-menu-item>
    </el-submenu>
    <el-submenu index="2-2">
      <span slot="title">Impuls</span>
      <el-menu-item index="2-2-1">Apple</el-menu-item>
      <el-menu-item index="2-2-2">MSI</el-menu-item>
    </el-submenu>

    <el-menu-item index="/report">
      <i class="fa fa-file-excel-o" />
      <span slot="title">
        Отчеты
      </span>
    </el-menu-item>
    <el-menu-item index="/map">
      <i class="fa fa-map-o" />
      <span slot="title">Тепловые карты</span>
    </el-menu-item>
    <el-menu-item index="/users">
      <i class="fa fa-users" />
      <span slot="title">Пользователи</span>
    </el-menu-item>
    <el-menu-item index="/domains">
      <i class="fa fa-sitemap" />
      <span slot="title">
        Домены / Сайты
      </span>
    </el-menu-item>
    <!--  -->
    <el-menu-item index="/settings">
      <i class="el-icon-setting" />
      <span slot="title">Настройки</span>
    </el-menu-item>
    <!-- TODO в разделе "Настройки" будем кранить логи деталей -->
    <!--  -->
    <el-menu-item index="">
      <i class="fa fa-sign-out" />
      <span slot="title">Выход</span>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical {
  min-height: 100vh;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
