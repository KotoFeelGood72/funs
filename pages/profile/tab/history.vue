<template>
  <div class="orders">
    <div class="small-container">
      <div class="header">
        <h3>История заказов</h3>
      </div>
      <div class="order_list__w">
        <div class="order_list">
          <div
            class="order_item"
            v-for="item in histories"
            :key="'orders-item'"
            v-if="histories.length > 0"
          >
            <!-- :logo="item?.itineraries[0].segments[0].carrier_logo" -->

            <AirHead :title="item?.airline" />
            <AirInfoMsg
              v-for="(subitem, i) in item?.itineraries"
              :key="'card-itineraries' + i"
              :info="subitem"
            />
          </div>
          <empty
            v-else
            title="В истории еще нет заказов"
            txt="Для отображение заказов в истории вам требуется оформить заказ"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AirHead from "~/components/ui/air/AirHead.vue";
import AirInfoMsg from "~/components/ui/air/AirInfoMsg.vue";
import { useOrderStore, useOrderStoreRefs } from "~/store/useOrderStore";
import empty from "~/components/ui/empty.vue";

const { getHistory } = useOrderStore();
const { histories } = useOrderStoreRefs();

onMounted(() => {
  getHistory();
});
</script>

<style scoped lang="scss">
.orders {
  padding: 3.2rem 0 0 0;

  @include bp($point_2) {
    padding: 0;
  }
}

.header {
  text-align: center;
  margin-bottom: 3.2rem;
  h3 {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 2rem;
    }
  }
}

.order_item {
  border: 0.1rem solid #e3e3e3;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.order_list__w {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  & > p {
    font-size: 1.8rem;
  }
}
</style>
