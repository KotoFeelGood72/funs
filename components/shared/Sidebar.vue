<template>
  <div class="sidebar">
    <div class="sidebar-head" @click="toggleFilters">
      <p>Фильтры</p>
      <div :class="['arrow_expanded', { active: isExpanded }]">
        <Icon name="bxs:down-arrow" :size="12" />
      </div>
      <div class="clear" @click.stop="resetFilters" v-if="hasActiveFilters">
        <p>Сбросить</p>
        <div class="ic"><Icon name="f:close" /></div>
      </div>
    </div>

    <div v-show="isExpanded" class="col">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Checkboxes from "../ui/inputs/Checkboxes.vue";

const props = defineProps<{
  airlines?: any;
  modelValue: {
    transfer: number[];
    airline: string[];
  };
}>();

const emit = defineEmits(["update:modelValue"]);

const transfer = ["1 пересадка", "2 пересадки", "3 пересадки"];

const localValueTransfers = ref<number[]>(props.modelValue.transfer || []);
const localValueAirline = ref<string[]>(props.modelValue.airline || []);

const isExpanded = ref(true);

const screenWidth = ref<number | null>(null);
const updateScreenWidth = () => {
  if (typeof window !== "undefined") {
    screenWidth.value = window.innerWidth;
  }
};

const hasActiveFilters = computed(() => {
  return (
    localValueTransfers.value.length > 0 || localValueAirline.value.length > 0
  );
});

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

const toggleFilters = () => {
  if (screenWidth.value <= 1024) {
    // Работает только для мобильных и планшетов
    isExpanded.value = !isExpanded.value;
  }
};
const resetFilters = () => {
  localValueTransfers.value = [];
  localValueAirline.value = [];
};

onMounted(() => {
  updateScreenWidth(); // Устанавливаем начальное значение
  window.addEventListener("resize", updateScreenWidth);
});

// Очищаем слушатель при размонтировании
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
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

  @include bp($point_2) {
    position: static;
    width: 100%;
    max-width: 100%;
    gap: 2rem;
  }
}

.sidebar-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  position: relative;

  & > p {
    font-size: 2.4rem;
    font-family: $font_2;

    @include bp($point_2) {
      font-size: 1.8rem;
    }
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

.arrow_expanded {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  transition: transform 0.3s ease;

  @include bp($point_2, $direction: min) {
    display: none;
  }

  &.active {
    transform: translateY(-50%) rotate(180deg);
  }
}

.row {
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
