<template>
  <div class="col-6 mb-15">
    <div :class="['source', !item.published ? 'source--off' : '']">
      <n-link :to="`/company/${item._id}`" class="source__content">
        <div v-if="item.image" class="source__img">
          <img :src="`/site/images/brand${item.image}`" />
        </div>
        <div class="source__name">{{ item.name }} - {{ item.company }}</div>
      </n-link>
      <!--  -->
      <div
        v-if="$abilities('source-update')"
        @click="() => $emit('edit', item)"
        class="source__edit"
      >
        <i class="el-icon-edit" />
      </div>

      <el-popconfirm
        v-if="$abilities('source-remove')"
        @onConfirm="() => $emit('remove', item)"
        title="Удалить источник?"
        confirm-button-text="Да"
        confirm-button-type="success"
        cancel-button-type="default"
        cancel-button-text="Нет, спасибо"
      >
        <el-button
          slot="reference"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          class="source__remove"
        />
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
