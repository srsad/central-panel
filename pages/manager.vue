<template>
  <div class="row w100 mt-15">
    <div class="col-12">
      <el-tabs value="spb_26047">
        <el-tab-pane
          v-if="$abilities('manager-spb_26047_panel')"
          :lazy="true"
          label="СПБ 2-я Красноармейская"
          name="spb_26047"
        >
          <app-panel branch="26047" />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('manager-spb_33038_panel')"
          :lazy="true"
          label="СПБ Дмитровский"
          name="spb_33038"
        >
          <app-panel branch="33038" />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('manager-msk_63323_panel')"
          :lazy="true"
          label="МСК Новослободская"
          name="msk_63323"
        >
          <app-panel branch="63323" />
        </el-tab-pane>
        <el-tab-pane
          v-if="$abilities('manager-msk_72021_panel')"
          :lazy="true"
          label="МСК Сеславинская"
          name="msk_72021"
        >
          <app-panel branch="72021" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AppPanel from '~/components/manager/Panel'

export default {
  components: {
    AppPanel
  },
  data() {
    return {
      activeName: ''
    }
  },
  fetch({ store, error }) {
    store.dispatch('settings/setBreadcrumbs', [
      {
        uri: '/manager',
        label: 'Филиалы'
      }
    ])
  },
  mounted() {
    if (this.$store.getters['report/branch/branches'].length === 0) {
      this.$store.dispatch('report/branch/fetchItems')
    }
  }
}
</script>
