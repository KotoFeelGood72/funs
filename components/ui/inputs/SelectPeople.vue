<template>
  <div class="people-wrapper" ref="wrapper">
    <div class="header" @click="toggleDropdown">
      <div class="header_col">
        <p>{{ passengerText }}</p>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isDropdownVisible"
        :class="['dropdown', dropdownPosition]"
        ref="dropdown"
      >
        <Counter label="Взрослые" v-model="localAdults" :maxValue="20" :minValue="1" />
        <Counter label="Дети" v-model="children" :minValue="0" />
        <Counter
          label="Кол-во звезд"
          v-model="localStars"
          v-if="stars"
          :minValue="3"
          :maxValue="5"
        />

        <!-- Аналогично для класса -->
        <Checkbox
          v-if="!props.isHotel"
          id="isBusinessClass"
          label="Бизнес класс"
          value="BUSINESS"
          v-model="isBusiness"
          name="isBusinessClass"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  defineProps,
  defineEmits,
} from "vue";
import Checkbox from "./Checkbox.vue";
import Counter from "./Counter.vue";
import { usePassengers } from "@/composables/usePassengers";

const props = defineProps<{
  adults: number;
  classType?: string;
  stars?: any;
  isHotel?: boolean;
}>();

const emit = defineEmits(["update:adults", "update:classType", "update:stars"]);
const { createPassengers, createPassengersAvia } = usePassengers();

const isBusiness = computed<boolean>({
  get: () => props.classType === "BUSINESS",
  set: (val) => emit("update:classType", val ? "BUSINESS" : "ECONOMY"),
});

const localStars = computed<any>({
  get: () => props.stars,
  set: (newValue) => emit("update:stars", newValue),
});

const children = ref<number>(0);
const localAdults = ref<number>(0);
const isDropdownVisible = ref(false);
const dropdownPosition = ref<"top" | "bottom">("bottom");
const wrapper = ref<HTMLElement | null>(null);

const classTypeTranslation: Record<string, string> = {
  ECONOMY: "Эконом",
  BUSINESS: "Бизнес",
};

const passengerText = computed(() => {
  const total = localAdults.value + children.value;

  // Если общее количество равно 0, показываем placeholder
  if (total === 0) {
    return "Выберите кол-во пассажиров";
  }

  // Соберём информацию о звёздах
  // Чтобы потом условно добавить `(3★)` или пропустить
  let starInfo = "";
  if (props.stars) {
    starInfo = `${props.stars}★`;
  }

  // 1) Если classType не передан => "гость/гостей"
  if (!props.classType) {
    // Для 1 человека = "гость", для остальных = "гостей"
    const suffix = total === 1 ? "гость" : "гостей";

    // Если есть звезды, то добавляем их в скобках
    if (starInfo) {
      return `${total} ${suffix} (${starInfo})`;
    } else {
      return `${total} ${suffix}`;
    }
  }

  // 2) Если classType передан => используем "пассажир / пассажира"
  // Для 1 человека = "пассажир", для остальных = "пассажира"
  const suffix = total === 1 ? "" : "а";

  // Собираем класс + звёзды в одном месте
  // Например, "Эконом, 3★"
  let classInfoParts: string[] = [];
  if (props.classType && classTypeTranslation[props.classType]) {
    classInfoParts.push(classTypeTranslation[props.classType]);
  }
  if (starInfo) {
    classInfoParts.push(starInfo);
  }

  // Если у нас вообще что-то собралось, то кладём в скобки
  let classInfo = "";
  if (classInfoParts.length) {
    classInfo = ` (${classInfoParts.join(", ")})`;
  }

  return `${total} пассажир${suffix}${classInfo}`;
});

const toggleDropdown = async () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  if (isDropdownVisible.value) {
    await nextTick();
    calculateDropdownPosition();
  }
};

watch(
  [() => localAdults.value, () => children.value],
  ([newAdults, newChildren], [oldAdults, oldChildren]) => {
    const oldSum = oldAdults + oldChildren;
    const newSum = newAdults + newChildren;

    if (newSum !== oldSum) {
      emit("update:adults", newSum);

      if (!props.classType) {
        createPassengers(newAdults, newChildren);
      } else {
        createPassengersAvia(newSum);
      }
    }
  }
);

const closeDropdown = (event: MouseEvent) => {
  if (
    isDropdownVisible.value &&
    wrapper.value &&
    !wrapper.value.contains(event.target as Node)
  ) {
    isDropdownVisible.value = false;
  }
};

const calculateDropdownPosition = () => {
  if (!wrapper.value) return;
  const wrapperRect = wrapper.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  dropdownPosition.value = wrapperRect.bottom + 200 > viewportHeight ? "top" : "bottom";
};

// onMounted(() => {
//   const sum = localAdults.value + children.value;
//   if (!props.classType) {
//     createPassengers(localAdults.value, children.value);
//   } else {
//     createPassengersAvia(sum);
//   }

//   document.addEventListener("click", closeDropdown);
// });
onBeforeUnmount(() => document.removeEventListener("click", closeDropdown));
</script>

<style scoped lang="scss">
.people-wrapper {
  position: relative;
  width: 100%;
  height: 4.6rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  min-width: 30rem;
}

.header_ic {
  @include flex-center;
  margin-right: 1rem;
  @include bp($point_2) {
    margin-right: 0;
  }
}
.header {
  @include flex-space;
  gap: 2rem;
  border: 0.1rem solid #d8d7d7;
  cursor: pointer;
  height: 100%;
  padding: 1.2rem 2rem;
  border-radius: 0.5rem;

  span {
    font-size: 1.4rem;
    color: $blue;
    line-height: 1rem;
    display: inline-flex;
  }

  p {
    font-size: 1.8rem;
    color: $dark;
    font-family: $font_2;
    line-height: 1.6rem;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
}

.counter-container {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
.dropdown {
  position: absolute;
  background-color: $white;
  padding: 2.4rem;
  width: 100%;
  z-index: 111;
  overflow: hidden;
  box-shadow: 0 0 0.9rem 0.2rem #00000011;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @include bp($point_2) {
    padding: 1.6rem;
  }
  &.top {
    bottom: calc(100% + 2rem);
  }
  &.bottom {
    top: calc(100% + 2rem);
  }
}

.txt {
  p {
    font-size: 1.4rem;
    color: $gray;
    margin-bottom: 1.2rem;
  }
  span {
    color: $gray;
    font-size: 1.4rem;
    line-height: 1.6rem;
    display: block;
  }
}

.people__bottom {
  padding: 2.4rem 0 0 0;
  margin-top: 1.7rem;
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: -50%;
    content: "";
    border-bottom: 0.1rem solid #0a66c225;
    width: 150%;
  }
}

.children-ages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.label {
  display: block;
  z-index: 22;
  color: $blue;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: $dark;
  font-family: $font_2;
  transition: all 0.3s ease-in-out;

  color: $blue;
  font-size: 1.4rem;
  top: 0;
}

.class-type {
  position: relative;
}
</style>
