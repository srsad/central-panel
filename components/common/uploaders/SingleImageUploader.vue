<template>
  <div>
    <el-upload
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="false"
      :limit="1"
      :class="fileName ? 'imgUploaderItem-off' : 'imgUploaderItem'"
      :on-change="handleChange"
      action="#"
      list-type="picture-card"
      style="margin:0 auto;text-align:center"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="max-content" append-to-body>
      <img :src="dialogImageUrl" class="img-fluid" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      fileName: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleChange(file) {
      this.image = file
      this.fileName = file.name
      this.$emit('input', file)
    },
    async handleRemove(file, fileList) {
      this.dialogImageUrl = ''
      this.image = ''
      this.$emit('input', null)
      // eslint-disable-next-line prettier/prettier
      await setTimeout(() => { this.fileName = '' }, 1000)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
