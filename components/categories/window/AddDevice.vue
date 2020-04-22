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
          <!-- pagetitle -->
          <div class="col-7">
            <el-form-item prop="pagetitle">
              <el-input
                v-model="form.pagetitle"
                :disabled="disabledItem"
                placeholder="Наименование"
              />
            </el-form-item>
          </div>
          <!-- end pagetitle -->
          <!-- series -->
          <div class="col-5">
            <el-form-item prop="series">
              <el-select
                v-model="form.series"
                @change="onChange"
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
        <div v-if="!form.imagePath">
          <label for="fileUploader" class="btn btn-outline-info btn-lg">
            <i class="fa fa-cloud-download" />
          </label>
          <input
            id="fileUploader"
            @change="onFileChange"
            type="file"
            name="fileUploader"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <p class="form-text text-danger">
            Чтобы продолжиь загрузите изображение
          </p>
        </div>
        <div v-else class="text-center img-container">
          <img :src="form.imagePath" class="img-fluid" />
          <el-button
            @click.prevent="removeImage"
            size="mini"
            title="Удалить"
            type="danger"
            icon="el-icon-delete"
          />
        </div>
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
      <div class="col-12 text-right mt-15">
        <el-button
          @click.prevent="validateForm"
          type="success"
          icon="el-icon-plus"
        >
          Добавить
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      disabledItem: true,
      form: {
        pagetitle: '',
        series: '',
        longtitle: '',
        description: '',
        content: '',
        imagePath: '',
        image: null
      },
      series: [],
      rules: {
        pagetitle: [
          {
            required: true,
            message: 'Введите запись',
            trigger: 'blur'
          },
          {
            min: 3,
            message: 'Минимум 3 символа',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символов',
            trigger: 'blur'
          }
        ],
        series: [
          {
            required: true,
            message: 'Выберите серию',
            trigger: 'blur'
          }
        ]
      },
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
      return this.form.pagetitle ? this.form.pagetitle : 'Добавить устроиство'
    }
  },
  methods: {
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onCreate()
        } else {
          return false
        }
      })
    },
    onCreate() {
      // уведомляем челиков в телеге || создаем устроиство
      const url = `https://api.telegram.org/bot1113218700:AAE_XXJyTH4UCWE7_JfZXmVtXVA6Vyns4qE/sendMessage`
      try {
        this.$axios.$get(url, {
          params: {
            chat_id: 479029367,
            text: {
              pagetitle: this.form.pagetitle,
              series: this.form.series,
              longtitle: this.form.longtitle,
              description: this.form.description,
              content: this.form.content
            }
          }
        })
        this.clearForm()
        this.onClose()
        this.$notify({
          message: 'Устройство станет доступно в течении пары часов!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        // this.clearForm()
        // this.onClose()
        this.$store.commit('SET_ERROR', 'Что-то пошло не так!')
      }
    },
    clearForm() {
      this.form.pagetitle = ''
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
        this.form.pagetitle = this.$store.state.source.page.params.brand
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
    },
    onChange(item) {
      if (this.form.series === '') {
        this.disabledItem = true
      } else {
        this.disabledItem = false
        const series = this.form.series.replace(`${this.form.pagetitle} `, '')
        this.form.pagetitle = `${this.$store.state.source.page.params.brand} ${series} `
      }
    },
    onFileChange(e) {
      this.form.fileUpl = e.target.files[0]
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.imagePath = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage(file) {
      this.form.fileUpl = ''
      this.form.imagePath = ''
    }
  }
}
</script>

<style lang="sass">
#fileUploader
  display: none
[for="fileUploader"]
  display: block
  margin: 0 auto
  text-align: center
  & i
    font-size: 72px
    cursor: pointer
.img-container
  .el-button--danger
    top: 0
    right: 5px
    position: absolute
</style>
