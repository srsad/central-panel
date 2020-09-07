<template>
  <draggable
    :list="statuses"
    @change="onLog"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    :group="`company${rnd}`"
    handle=".statusList__drag"
  >
    <transition-group :name="!drag ? 'flip-list' : null" type="transition">
      <template>
        <div v-for="(item, idx) in statuses" :key="idx" class="statusList">
          <el-tooltip
            effect="dark"
            content="Переместить позицию"
            placement="left"
          >
            <div class="statusList__drag">
              <i class="el-icon-sort" />
            </div>
          </el-tooltip>
          <div :style="`background:${item.color}`" class="statusList__color" />
          <div class="statusList__name">
            {{ item.name }}
          </div>
          <div class="statusList__action">
            <el-button
              :loading="loading"
              @click="onEdit(item)"
              size="mini"
              type="primary"
              title="Редактировать"
              icon="el-icon-edit-outline"
            />

            <el-popconfirm
              @onConfirm="onRemove(item)"
              title="Удалить статус?"
              confirm-button-text="Да"
              confirm-button-type="success"
              cancel-button-type="default"
              cancel-button-text="Нет"
            >
              <el-button
                slot="reference"
                :loading="loading"
                size="mini"
                type="danger"
                title="Удалить"
                icon="el-icon-delete"
              />
            </el-popconfirm>
          </div>
        </div>
      </template>
    </transition-group>
  </draggable>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      drag: true,
      statuses: [],
      rules: {
        name: [
          {
            required: true,
            message: 'Введите статус',
            trigger: 'blur'
          },
          {
            max: 255,
            message: 'Максимум 255 символа',
            trigger: 'blur'
          }
        ]
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ],
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  computed: {
    dragDisabled() {
      return false
      // return !this.$abilities('source-update')
    },
    rnd() {
      const min = Math.ceil(1000)
      const max = Math.floor(9999)
      return Math.floor(Math.random() * (max - min)) + min
    }
  },
  watch: {
    items(val) {
      this.statuses = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    /**
     * окно редактирования статуса
     */
    onEdit(item) {
      this.$store.dispatch('crm/settings/setStatus', item)
      this.$store.commit('settings/SWITCH_DRAWNER', {
        dranwer: 'drawerCRMUpdateStatus',
        status: true
      })
    },

    /**
     * Пересчет menuindex у перетаскиваемых элементов
     */
    async onLog(evt) {
      const items = JSON.parse(JSON.stringify(this.statuses))
      const res = []
      for (const idx in items) {
        await res.push({
          _id: items[idx]._id,
          menuindex: idx
        })
      }

      await this.$axios.$put(
        '/api/v1/crm/settings/status/update-menuindex',
        res
      )
      // обновляем список
      this.$store.dispatch('crm/settings/fetchItems')
    },
    /**
     * Удаление позиции
     */
    async onRemove(item) {
      this.loading = true
      try {
        await this.$axios.$delete(
          '/api/v1/crm/settings/status/remove/' + item._id
        )
        // обновляем список
        this.$store.dispatch('crm/settings/fetchItems')
        this.$notify({
          message: 'Статус успешно удален!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="sass">
.statusList
  display: flex
  flex-wrap: wrap
  align-items: center
  margin-bottom: 5px
  &__drag
    width: 30px
    height: 30px
    justify-content: center
    align-items: center
    display: flex
    background: #bfcbd9
    color: #fff
    cursor: pointer
  &__color
    width: 10px
    height: 30px
    margin: 0 4px
  &__name
    min-width: 300px
  &__action
</style>
