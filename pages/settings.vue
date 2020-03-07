<template>
  <div class="row w100" style="margin-top:15px;">
    <div class="col-12">
      <el-tabs value="apikey">
        <el-tab-pane label="API ключи" name="apikey">
          <AppApiKey :items="items" />
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
  },
  data() {
    return {
      items: [
        {
          _id: '_idasdkasdkasd',
          comments: 'Комментарий 1',
          apiKey: '7a62c3ecf4fb8b3f3f956341e8f43ac8',
          created: 'дата создания',
          updated: 'дата обновления'
        },
        {
          _id: '_idasdkasdkasd',
          comments: 'Комментарий 2',
          apiKey: 'a230ce13cbffd20d6dfdde7a9786c293',
          created: 'дата создания',
          updated: 'дата обновления'
        },
        {
          _id: '_idasdkasdkasd',
          comments: 'Комментарий 3',
          apiKey: '3484db6e3de76e9281a13910f37dd0f3',
          created: 'дата создания',
          updated: 'дата обновления'
        }
      ]
    }
  }
}
</script>
