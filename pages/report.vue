<template>
  <div class="row w100 mt-12">
    <div class="col-12">
      <el-tabs value="main_branch">
        <el-tab-pane
          v-if="$abilities('report-main_branch_panel-read')"
          label="Основная"
          name="main_branch"
        >
          <app-main-branch-panel />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('report-spb_26047_panel-read')"
          label="СПБ 2-я Красноармейская"
          name="spb_26047"
        >
          СПБ 2-я Красноармейская
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('report-spb_33038_panel-read')"
          label="СПБ Дмитровский"
          name="spb_33038"
        >
          СПБ Дмитровский
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('report-msk_63323_panel-read')"
          label="МСК Новослободская"
          name="msk_63323"
        >
          МСК Новослободская
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('report-msk_72021_panel-read')"
          label="МСК Армянский"
          name="msk_72021"
        >
          МСК Армянский
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppMainBranchPanel from '~/components/report/tabs/branch/Panel'

export default {
  components: {
    AppMainBranchPanel
  },
  async fetch({ store }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/report',
        label: 'Отчеты'
      }
    ])
    // TODO вывести в mounted с проверкой наличия и постзагрузкой
    await store.dispatch('report/brand/fetchItems')
    await store.dispatch('report/branch/fetchItems')
    await store.dispatch('report/summary/fetchItems')
  }
  // TODO считаем активную вкладку
}
</script>
