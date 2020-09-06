<template>
  <draggable
    :list="statuses"
    @change="onLog"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    :group="`company${rnd}`"
    handle=".drag-handle"
  >
    <transition-group :name="!drag ? 'flip-list' : null" type="transition">
      <el-form
        v-for="(item, idx) of statuses"
        :key="item._id"
        :disabled="loading"
        :rules="rules"
        :ref="`form${idx}`"
        :model="statuses[idx]"
        class="row"
      >
        <el-form-item class="col-3" prop="name">
          <el-input
            v-model="statuses[idx].name"
            size="small"
            placeholder="Статус"
          >
            <div slot="prepend" class="drag-handle pointer">
              <i class="el-icon-sort" />
            </div>
            <el-color-picker
              slot="suffix"
              v-model="statuses[idx].color"
              :predefine="predefineColors"
              size="small"
              style="margin: 0 -5px"
            />
          </el-input>
        </el-form-item>
        <el-form-item class="col-1">
          <el-button
            :loading="loading"
            @click="onUpdate(item)"
            size="mini"
            type="primary"
            icon="fa fa-floppy-o"
            title="Создать"
          />
          <!--  -->
          <el-popconfirm
            @onConfirm="onRemove(statuses[idx])"
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
        </el-form-item>
      </el-form>
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
     * Обновление позиции
     */
    async onUpdate(item) {
      this.loading = true
      try {
        await this.$axios.$put(
          '/api/v1/crm/settings/status/update/' + item._id,
          item
        )
        // обновляем список
        this.$store.dispatch('crm/settings/fetchItems')
        this.$notify({
          message: 'Статус успешно обновлен!',
          customClass: 'success-notyfy'
        })
      } catch (e) {
        this.$store.commit('SET_ERROR', e.response.data.message)
      } finally {
        this.loading = false
      }
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
