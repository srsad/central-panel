<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs value="console">
        <el-tab-pane label="Консоль" name="console">
          <app-console-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppConsolePanel from '~/components/code/console/Panel'
export default {
  components: {
    AppConsolePanel
  }
}
</script>
