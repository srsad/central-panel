<template>
  <div class="col-sm-6 col-lg-4 col-xl-3 mb-20">
    <div
      @click="() => $emit('select', item)"
      :class="{ active: activeItem }"
      class="category"
    >
      <!-- <div
        class="category__img"
        style="background:url(https://app-serv-fix.ru/dasfheafhnsdf/templates/default/img/repair/categories_new/smartphone.png) 50% 50% / contain no-repeat;"
      /> -->
      <div class="category__text">
        {{ item.name }}
      </div>
      <div class="category__control">
        <el-button
          :loading="loading"
          @click.stop="() => $emit('edit', item)"
          size="mini"
          icon="el-icon-edit"
          class="category__edit"
        />

        <div>
          <el-popconfirm
            @onConfirm="() => $emit('remove', item)"
            title="Удалить категорию?"
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
              class="category__remove"
            />
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',

  props: {
    item: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    activeItem() {
      // eslint-disable-next-line prettier/prettier
      const selectCategoryId = this.$store.state.repair.category.selectCategory?._id
      return this.item._id === selectCategoryId
    }
  }
}
</script>

<style lang="sass">
// .catebory-item
//   display: flex
</style>
