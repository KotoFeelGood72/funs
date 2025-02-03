<template>
  <div class="sidebar">
    <div class="sidebar-head">
      <p>Фильтры</p>
      <div class="clear" @click="resetFilters">
        <p>Сбросить</p>
        <div class="ic"><Icon name="f:close" /></div>
      </div>
    </div>

    <!-- Фильтр по пересадкам -->
    <div class="row">
      <div class="row-head">Пересадки</div>
      <div class="list">
        <Checkboxes
          :id="'transfer-item-' + i"
          :label="item"
          :value="parseInt(item)"
          v-for="(item, i) in transfer"
          :key="'transfer-item-' + i"
          v-model="localValueTransfers"
          name="transfers"
        />
      </div>
    </div>

    <div class="row">
      <div class="row-head">Авиакомпании</div>
      <div class="list">
        <Checkboxes
          :id="'airline-item-' + i"
          :label="item"
          :value="item"
          v-for="(item, i) in airlines"
          :key="'airline-item-' + i"
          v-model="localValueAirline"
          name="airline"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Checkboxes from "../ui/inputs/Checkboxes.vue";

// Принимаем проп modelValue из родительского компонента
const props = defineProps<{
  airlines?: any;
  modelValue: {
    transfer: number[];
    airline: string[];
  };
}>();

const emit = defineEmits(["update:modelValue"]);

const transfer = ["1 пересадка", "2 пересадки", "3 пересадки"];

// Локальные значения, которые синхронизируются с родительским v-model
const localValueTransfers = ref<number[]>(props.modelValue.transfer || []);
const localValueAirline = ref<string[]>(props.modelValue.airline || []);

// Следим за изменениями и обновляем родительский v-model
watch(
  () => [localValueTransfers.value, localValueAirline.value],
  () => {
    emit("update:modelValue", {
      transfer: localValueTransfers.value,
      airline: localValueAirline.value,
    });
  },
  { deep: true }
);

// Функция сброса фильтров
const resetFilters = () => {
  localValueTransfers.value = [];
  localValueAirline.value = [];
};
</script>

<style scoped lang="scss">
.sidebar {
  border: 0.1rem solid #d9d9d9;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 1.6rem;
  border-radius: 0.8rem;
  width: 100%;
  max-width: 29rem;
  position: sticky;
  top: 3rem;
  left: 0;
}

.sidebar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;

  & > p {
    font-size: 2.4rem;
    font-family: $font_2;
  }
}

.clear {
  display: flex;
  align-items: center;
  background-color: $gray-light;
  padding: 0.5rem;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1.6rem;
  gap: 0.8rem;
  font-family: $font_2;
}

.ic {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row-head {
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
