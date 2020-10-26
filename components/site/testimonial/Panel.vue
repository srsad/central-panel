<template>
  <div>
    <div class="row">
      <div v-if="$abilities('sites-testimonial-read')" class="col-6">
        <el-select
          v-model="siteUrl"
          :disabled="loading"
          filterable
          size="mini"
          placeholder="Сайт"
        >
          <el-option v-for="item in sites" :key="item._id" :value="item._id">
            {{ item._id }}
          </el-option>
        </el-select>
        <el-button
          @click="loadTestimonials"
          :loading="loading"
          size="mini"
          type="primary"
          class="mb-20"
          icon="el-icon-position"
        >
          Выбрать
        </el-button>
      </div>
      <div class="col-6 text-right">
        <el-button
          v-if="$abilities('sites-testimonial-create')"
          @click="
            $store.commit('settings/SWITCH_DRAWNER', {
              dranwer: 'drawerSiteTestimonialCreate',
              status: true
            })
          "
          :loading="loading"
          size="mini"
          type="success"
          class="mb-20"
          icon="el-icon-plus"
        >
          Создать отзыв
        </el-button>
      </div>
      <!--  -->
      <div class="col-12">
        <app-list v-if="$abilities('sites-testimonial-read')" />
      </div>
      <!--  -->
    </div>
    <app-drawer-create v-if="$abilities('sites-testimonial-create')" />
    <app-drawer-update v-if="$abilities('sites-testimonial-update')" />
  </div>
</template>

<script>
import AppDrawerCreate from '~/components/site/testimonial/drawer/Create'
import AppDrawerUpdate from '~/components/site/testimonial/drawer/Update'
import AppList from '~/components/site/testimonial/List'

export default {
  components: {
    AppDrawerCreate,
    AppDrawerUpdate,
    AppList
  },
  data() {
    return {
      loading: false,
      siteUrl: ''
    }
  },
  computed: {
    sites() {
      return this.$store.getters['site/testimonial/sites']
    }
  },
  watch: {
    siteUrl(val) {
      this.$store.commit('site/testimonial/SET_SITE_URL', val)
    }
  },
  async mounted() {
    if (this.$store.getters['site/testimonial/sites'].lenght === 0) {
      await this.$store.dispatch('site/testimonial/fetchSites')
    }
  },
  methods: {
    async loadTestimonials() {
      if (!this.siteUrl) {
        this.$store.commit('SET_ERROR', 'Выберите сайт!')
        return false
      }
      this.loading = true
      try {
        await this.$store.dispatch(
          'site/testimonial/fetchTestimonials',
          this.siteUrl
        )
      } catch (e) {
        //
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
