<template>
  <div class="col-12 mb-40">
    <table class="planTable" border>
      <tr>
        <td class="planTable__header">{{ item.name }}</td>
        <td class="planTable__header">Планируемые</td>
        <td class="planTable__header">Фактические</td>
        <td class="planTable__header">Выполнение %</td>
      </tr>
      <tr>
        <td class="planTable__header">Количество заказов</td>
        <td>
          <el-input
            v-model="item.planned.number_of_orders"
            size="mini"
            class="w100"
            placeholder="Планируемые - cредний чек"
          />
        </td>
        <td>
          <el-input
            v-model="item.actual.number_of_orders"
            size="mini"
            class="w100"
            placeholder="Фактические - cредний чек"
          />
        </td>
        <td>{{ item.fulfillment.number_of_orders }}</td>
      </tr>
      <tr>
        <td class="planTable__header">Валовая прибыль</td>
        <td>
          <el-input
            v-model="item.planned.gross_profit"
            size="mini"
            class="w100"
            placeholder="Планируемые - cредний чек"
          />
        </td>
        <td>
          <el-input
            v-model="item.actual.gross_profit"
            size="mini"
            class="w100"
            placeholder="Фактические - cредний чек"
          />
        </td>
        <td>{{ item.fulfillment.gross_profit }}</td>
      </tr>
      <!--  -->
      <tr>
        <td class="planTable__header">Средний чек</td>
        <td>
          <el-input
            v-model="item.planned.average_bill"
            size="mini"
            class="w100"
            placeholder="Планируемые - cредний чек"
          />
        </td>
        <td>
          <el-input
            v-model="item.actual.average_bill"
            size="mini"
            class="w100"
            placeholder="Фактические - cредний чек"
          />
        </td>
        <td>{{ item.fulfillment.average_bill }}</td>
      </tr>
      <!--  -->
      <!-- <tr>
        <td>
          <el-popconfirm
            @onConfirm="remove(item)"
            title="Удалить план?"
            confirm-button-text="Да"
            confirm-button-type="success"
            cancel-button-type="default"
            cancel-button-text="Нет"
          >
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-delete"
              type="danger"
            />
          </el-popconfirm>
        </td>
      </tr> -->
    </table>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    idx: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * Удаление
     */
    remove(item) {
      this.$emit('remove', item)
    }
  }
}
</script>

<style lang="sass" scopd>
.planTable
  border-color: #ccc
  & tr
    & td
      padding: 3px
  &__header
    font-weight: 500
    color: #656565
    padding: 3px 7px !important
</style>
