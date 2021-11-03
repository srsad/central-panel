<template>
  <div class="col-12 mb-40 d-flex">
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
          <el-input-number
            v-if="$abilities('report-spb_33038_panel_plan_panel-update')"
            v-model="item.planned.number_of_orders"
            :controls="false"
            :disabled="loading"
            size="mini"
            class="w100"
            placeholder="План. - кол. заказов"
          />
          <span v-else>{{ item.planned.number_of_orders }}</span>
        </td>
        <td>
          <el-input-number
            v-if="$abilities('report-spb_33038_panel_plan_panel-update')"
            v-model="item.actual.number_of_orders"
            :controls="false"
            :disabled="loading"
            size="mini"
            class="w100"
            placeholder="Факт. - кол. заказов"
          />
          <span v-else>{{ item.actual.number_of_orders }}</span>
        </td>
        <td class="text-center">{{ item.fulfillment.number_of_orders }} %</td>
      </tr>
      <tr>
        <td class="planTable__header">Валовая прибыль</td>
        <td>
          <el-input-number
            v-if="$abilities('report-spb_33038_panel_plan_panel-update')"
            v-model="item.planned.gross_profit"
            :controls="false"
            :disabled="loading"
            size="mini"
            class="w100"
            placeholder="План. - вал. прибыль"
          />
          <span v-else>{{ item.planned.gross_profit }}</span>
        </td>
        <td>
          <el-input-number
            v-if="$abilities('report-spb_33038_panel_plan_panel-update')"
            v-model="item.actual.gross_profit"
            :controls="false"
            :disabled="loading"
            size="mini"
            class="w100"
            placeholder="Факт. - вал. прибыль"
          />
          <span v-else>{{ item.actual.gross_profit }}</span>
        </td>
        <td class="text-center">{{ item.fulfillment.gross_profit }} %</td>
      </tr>
      <!--  -->
      <tr>
        <td class="planTable__header">Средний чек</td>
        <td>
          <el-input-number
            v-if="$abilities('report-spb_33038_panel_plan_panel-update')"
            v-model="item.planned.average_bill"
            :controls="false"
            :disabled="loading"
            size="mini"
            class="w100"
            placeholder="План. - cр. чек"
          />
          <span v-else>{{ item.planned.average_bill }}</span>
        </td>
        <td>
          <el-input-number
            v-if="$abilities('report-spb_33038_panel_plan_panel-update')"
            v-model="item.actual.average_bill"
            :controls="false"
            :disabled="loading"
            size="mini"
            class="w100"
            placeholder="Факт. - cр. чек"
          />
          <span v-else>{{ item.actual.average_bill }}</span>
        </td>
        <td class="text-center">{{ item.fulfillment.average_bill }} %</td>
      </tr>
    </table>

    <!--  -->
    <div class="ml-15">
      <!-- v-if="$abilities('report-spb_33038_panel_plan_panel-remove')" -->
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      require: true
    },
    idx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      updateTimer: 0,
      statusTimer: false
    }
  },
  watch: {
    item: {
      handler(val, oldVal) {
        this.update(val)
      },
      deep: true
    }
  },
  methods: {
    /**
     * Удаление
     */
    remove(item) {
      this.$emit('remove', item)
    },

    /**
     * Обновление
     */
    update(item) {
      this.recalculation() // пересчитываем
      this.updateTimer = 5 // устанавливаем таймер
      if (!this.statusTimer) this.startTimerAndUpdateItem() // запускаем обратный отчет
    },

    /**
     * Пересчет
     */
    recalculation() {
      /* eslint-disable */
      // кол. факт. заказов / (кол. план. заказов / 100)
      const numberOfOrders = +this.item.actual.number_of_orders / (+this.item.planned.number_of_orders / 100)
      this.item.fulfillment.number_of_orders = isFinite(numberOfOrders) ? Math.round(numberOfOrders * 100) / 100 : 0 // Выполнение - Количество заказов
      // вал. приб. факт. / (вал. приб. план. / 100)
      const grossProfit = +this.item.actual.gross_profit / (+this.item.planned.gross_profit / 100)
      this.item.fulfillment.gross_profit = isFinite(grossProfit) ? Math.round(grossProfit * 100) / 100 : 0 // Выполнение - Валовая прибыль
      // ср. чек. факт. / (ср. чек. план. / 100)
      const averageBill = +this.item.actual.average_bill / (+this.item.planned.average_bill / 100)
      this.item.fulfillment.average_bill = isFinite(averageBill) ? Math.round(averageBill * 100) / 100 : 0 // Выполнение - Средний чек
      /* eslint-enable */
    },

    /**
     * Запуск таймера, для отправки новых данных на сохранение
     */
    startTimerAndUpdateItem() {
      this.statusTimer = true
      if (this.updateTimer > 0) {
        return setTimeout(() => {
          --this.updateTimer
          this.startTimerAndUpdateItem()
        }, 1000)
      } else {
        this.statusTimer = false
        this.$emit('update', this.item)
      }
    }
  }
}
</script>

<style lang="sass" scopd>
.planTable
  // display: inline-block
  border: 0px solid #ccc
  & tr
    & td
      padding: 3px
  &__header
    font-weight: 500
    color: #656565
    padding: 3px 7px !important
</style>
