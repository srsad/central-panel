<template>
  <div>
    <el-menu
      :collapse="$store.state.settings.isCollapse"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        @click="
          $store.dispatch(
            'settings/switchIsCollapse',
            !$store.state.settings.isCollapse
          )
        "
        index="expand"
        class="color-fff"
      >
        <i class="el-icon-sort color-fff rotate-90" />
        <span slot="title">
          {{ $store.state.settings.isCollapse ? 'Открыть' : 'Скрыть' }}
        </span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location" />
          <span slot="title">Navigator One</span>
        </template>
        <el-menu-item-group>
          <span slot="title">Group One</span>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">item four</span>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">Navigator Four</span>
      </el-menu-item>
      <!--  -->
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">Выход</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical {
  min-height: 100vh;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
