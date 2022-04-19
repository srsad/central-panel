<template>
  <div class="col-6 col-sm-4 col-md-3 mb-15">
    <div :disabled="loading" class="brand-item">
      <n-link :to="'brand/' + item._id" class="brand-item__link">
        <!-- <div v-if="item.image" class="source__img">
          <img :src="`/site/images/brand${item.image}`" />
        </div> -->
        <div class="brand-item__name">
          {{ item.name }}
        </div>
      </n-link>
      <!--  -->
      <!-- v-if="$abilities('source-remove')" -->
      <el-button
        :loading="loading"
        @click.stop="() => $emit('edit', item)"
        size="mini"
        icon="el-icon-edit"
        class="source__edit"
      />

      <el-popconfirm
        @onConfirm="() => $emit('remove', item)"
        title="Удалить бренд?"
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
          class="source__remove"
        />
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandItem',
  props: {
    item: {
      type: Object,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass">
.brand-item
  background: #ffffff
  border: 1px solid #cccccc
  border-radius: 6px
  padding: 4px
  display: flex
  flex-direction: row
  &__link
    flex: 1
    color: #000000
    &:hover
      color: #000000
      text-decoration: none
  &__name
</style>
