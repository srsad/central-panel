<template>
  <div>
    <el-table
      :data="sites"
      :empty-text="$store.getters['settings/tableEmptyText']"
      @row-dblclick="edit"
      height="calc(100vh - 140px)"
      size="mini"
    >
      <el-table-column prop="name" label="Наименование">
        <template slot-scope="scope">
          <div :title="scope.row.name" class="ws-normal">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Действия">
        <template slot-scope="scope">
          <div class="ws-normal">
            <el-button
              @click="edit(scope.row)"
              :loading="loading"
              icon="el-icon-edit"
              title="редактировать"
              type="info"
              size="mini"
            />
            <el-popconfirm
              @onConfirm="remove(scope.row)"
              title="Удалить сайт?"
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
            <n-link :to="`/constructor/${scope.row._id}`">
              <i class="el-icon-s-promotion" />
            </n-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sites() {
      return this.$store.getters['siteConstructor/sites/sites'] || []
    }
  },
  methods: {
    /**
     * Редактиорвание элемента
     * @param {Object} item - редактируемый элемент
     */
    edit(item) {
      this.$emit('onEdit', item)
    },

    /**
     * Удаление элемента
     * @param {Object} item - удаляемый элемент
     */
    remove(item) {
      this.$emit('onRemove', item)
    }
  }
}
</script>
