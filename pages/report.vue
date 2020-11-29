<template>
  <div class="row w100 mt-12">
    <div class="col-12">
      <el-tabs id="branchWidth" value="main_branch">
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
          <app-spb-26047-branch-panel />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('report-spb_33038_panel-read')"
          label="СПБ Дмитровский"
          name="spb_33038"
        >
          <app-spb-33038-branch-panel />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('report-msk_63323_panel-read')"
          label="МСК Новослободская"
          name="msk_63323"
        >
          <app-msk-63323-branch-panel />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('report-msk_72021_panel-read')"
          label="МСК Армянский"
          name="msk_72021"
        >
          <app-msk-72021-branch-panel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppMainBranchPanel from '~/components/report/tabs/branch/main-branch/report/Panel'
import AppSpb33038BranchPanel from '~/components/report/tabs/branch/spb-33038/report/Panel'
import AppSpb26047BranchPanel from '~/components/report/tabs/branch/spb-26047/report/Panel'
import AppMsk72021BranchPanel from '~/components/report/tabs/branch/msk-72021/report/Panel'
import AppMsk63323BranchPanel from '~/components/report/tabs/branch/msk-63323/report/Panel'

export default {
  components: {
    AppMainBranchPanel,
    AppSpb33038BranchPanel,
    AppSpb26047BranchPanel,
    AppMsk72021BranchPanel,
    AppMsk63323BranchPanel
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
