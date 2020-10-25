<template>
  <el-table
    :data="testimonials"
    @row-dblclick="edit"
    :row-style="tableRowStyle"
    :empty-text="$store.getters['domains/emptyText']"
    size="mini"
  >
    <el-table-column prop="site_url" label="Сайт" width="150" />
    <el-table-column prop="brand" label="Бренд" width="100">
      <template slot-scope="scope">
        <div class="text-center">{{ scope.row.brand.name }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="order" label="Номер заказа" width="100" />
    <el-table-column prop="date" label="Дата" width="100" />
    <el-table-column prop="device" label="Устройство" width="150" />
    <el-table-column prop="testemonial" label="Отзыв" width="250" />
    <el-table-column prop="fullname" label="ФИО" width="150" />
    <el-table-column prop="rating" label="Оценка" width="150">
      <template slot-scope="scope">
        <el-rate v-model="scope.row.rating" :disabled="true" />
      </template>
    </el-table-column>
    <el-table-column prop="reply" label="Ответ" width="250" />
    <!--  -->
    <el-table-column
      v-if="
        $abilities('sites-testimonial-update') ||
          $abilities('sites-testimonial-remove')
      "
      label="Действия"
      label-class-name="text-center"
      fixed="right"
      width="200"
    >
      <template slot-scope="scope">
        <div class="text-center">
          <el-button-group>
            <el-button
              v-if="$abilities('sites-testimonial-update')"
              @click="edit(scope.row)"
              :loading="loading"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              title="Редактировать"
            />
            <el-button
              v-if="$abilities('sites-testimonial-update')"
              @click="switchStatus(scope.row)"
              :loading="loading"
              :icon="`${scope.row.status ? 'el-icon-check' : 'el-icon-close'}`"
              :title="
                // eslint-disable-next-line prettier/prettier
                `${scope.row.status ? 'Сделать не активным' : 'Сделать активным'}`
              "
              type="info"
              size="mini"
            />
            <el-popconfirm
              v-if="$abilities('sites-testimonial-remove')"
              @onConfirm="remove(scope.$index, scope.row)"
              title="Удалить отзыв?"
              confirm-button-text="Да"
              confirm-button-type="success"
              cancel-button-type="default"
              cancel-button-text="Нет, спасибо"
            >
              <el-button
                slot="reference"
                :loading="loading"
                size="mini"
                type="danger"
                icon="el-icon-delete"
              />
            </el-popconfirm>
          </el-button-group>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    testimonials() {
      return JSON.parse(
        JSON.stringify(this.$store.getters['site/testimonial/testimonials'])
      )
    }
  },
  methods: {
    edit() {},
    async remove(idx, row) {
      this.loading = true
      try {
        await this.$axios.$delete('/api/v1/site/testimonial/remove/' + row._id)
        this.$store.dispatch('site/testimonial/fetchTestimonials', row.site_url)
        this.$notify({
          message: 'Отзыв удален!',
          customClass: 'success-notyfy'
        })

        // Обновляем список бренды + домены
        this.$store.dispatch('site/testimonial/fetchSites')
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    },
    async switchStatus(row) {
      this.loading = true
      try {
        const formData = {
          _id: row._id,
          status: !row.status
        }
        await this.$store.dispatch('site/testimonial/update', formData)
        console.log('asd', row)
        this.$store.dispatch('site/testimonial/fetchTestimonials', row.site_url)
        this.$notify({
          message: 'Отзыв Обновлен!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        //
      } finally {
        this.loading = false
      }
    },
    /** Подцветка строк и проверка на активность */
    tableRowStyle({ row, rowIndex }) {
      const style = {}
      if (!row.status) style.opacity = '0.6'
      return style
    }
  }
}
</script>
