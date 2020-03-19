<template>
  <div class="row w100" style="margin-top:15px;">
    <div class="col-12">
      <el-tabs value="apikey">
        <el-tab-pane label="API ключи" name="apikey">
          <AppApiKey />
        </el-tab-pane>
        <el-tab-pane label="Два" name="second">Два</el-tab-pane>
        <el-tab-pane label="Три" name="third">Три</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppApiKey from '~/components/settings/ApiKeys'

export default {
  components: {
    AppApiKey
  }
}
</script>
