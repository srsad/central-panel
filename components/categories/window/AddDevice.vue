<template>
  <el-dialog
    :visible.sync="$store.state.settings.drawerAddDevice"
    :before-close="onClose"
    @open="onOpen"
    :title="title"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="loading"
      class="row"
    >
      <div class="col-8">
        <div class="row">
          <!-- name -->
          <div class="col-7">
            <el-form-item prop="name">
              <el-input v-model="form.name" placeholder="Наименование" />
            </el-form-item>
          </div>
          <!-- end name -->
          <!-- series -->
          <div class="col-5">
            <el-form-item prop="series">
              <el-select
                v-model="form.series"
                filterable
                allow-create
                default-first-option
                class="w100"
                placeholder="Серия устроиства"
              >
                <el-option
                  v-for="(item, idx) in series"
                  :key="idx"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- end series -->
          <!-- longtitle -->
          <div class="col-12">
            <el-form-item prop="longtitle">
              <el-input
                v-model="form.longtitle"
                placeholder="Расширенный заголовок (title)"
                maxlength="255"
                show-word-limit
              />
            </el-form-item>
          </div>
          <!-- end longtitle -->
          <!-- description -->
          <div class="col-12">
            <el-form-item prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                placeholder="Описание"
                maxlength="255"
                rows="4"
                show-word-limit
              />
            </el-form-item>
          </div>
          <!-- end description -->
        </div>
      </div>
      <!-- image -->
      <div class="col-4">
        img
      </div>
      <!-- end image -->
      <!-- content -->
      <div class="col-12">
        <vue-editor
          id="editor"
          :editorToolbar="toolbar"
          v-model="form.content"
        />
      </div>
      <!-- end content -->
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        series: '',
        longtitle: '',
        description: '',
        content: '',
        image: null
      },
      series: [],
      rules: {},
      toolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ color: [] }, { background: [] }],
        ['link', 'image'],
        ['image', 'code-block']
      ]
    }
  },
  computed: {
    title() {
      return this.form.name ? this.form.name : 'Добавить устроиство'
    }
  },
  methods: {
    clearForm() {
      this.form.name = ''
      this.form.series = ''
      this.form.longtitle = ''
      this.form.description = ''
      this.form.content = ''
      this.form.image = null
      this.series = []
    },
    async onOpen() {
      this.series = []
      // запрос на получение списка серий
      try {
        const series = await this.$axios.$get(
          `https://${this.$store.getters['source/page/params'].source}/rest/?get=seriesList`
        )
        for (const key in series.data) this.series.push({ value: key })
      } catch (e) {
        this.clearForm()
        this.onClose()
        this.$store.commit('SET_ERROR', 'Не удалось получить список серий!')
      }
    },
    onClose() {
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerAddDevice',
        status: false
      })
    }
  }
}
</script>
