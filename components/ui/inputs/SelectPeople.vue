<template>
  <div class="people-wrapper" ref="wrapper">
    <div class="header" @click="toggleDropdown">
      <div class="header_col">
        <p>{{ passengerText }}</p>
      </div>
      <div class="header_ic">
        <Icon name="f:user" :size="16" />
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isDropdownVisible"
        :class="['dropdown', dropdownPosition]"
        ref="dropdown"
      >
        <!-- v-model="localAdults" привязан к props.adults (и событию update:adults) -->
        <Counter label="Взрослые" v-model="localAdults" />
        <Counter label="Дети" v-model="children" />

        <!-- Аналогично для класса -->
        <Checkbox
          id="isBusinessClass"
          label="Бизнес класс"
          value="BUSINESS"
          v-model="localClass"
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

const props = defineProps<{
  adults: number;
  classType: string;
}>();

const emit = defineEmits(["update:adults", "update:classType"]);

const localAdults = computed<number>({
  get: () => props.adults,
  set: (newValue) => emit("update:adults", newValue),
});

const localClass = computed<string>({
  get: () => props.classType,
  set: (newValue) => emit("update:classType", newValue),
});

const children = ref<number>(0);

const isDropdownVisible = ref(false);
const dropdownPosition = ref<"top" | "bottom">("bottom");
const wrapper = ref<HTMLElement | null>(null);

const classTypeTranslation: Record<string, string> = {
  ECONOMY: "Эконом",
  BUSINESS: "Бизнес",
};

const passengerText = computed(() => {
  const total = localAdults.value + children.value;
  return `${total} пассажир${total === 1 ? "" : "а"} (${
    classTypeTranslation[localClass.value] || "Эконом"
  })`;
});

const toggleDropdown = async () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  if (isDropdownVisible.value) {
    await nextTick();
    calculateDropdownPosition();
  }
};

watch(localClass, (newVal) => {
  if (!newVal) {
    localClass.value = "ECONOMY";
  }
});

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
  dropdownPosition.value =
    wrapperRect.bottom + 200 > viewportHeight ? "top" : "bottom";
};

onMounted(() => document.addEventListener("click", closeDropdown));
onBeforeUnmount(() => document.removeEventListener("click", closeDropdown));
</script>

<style scoped lang="scss">
.people-wrapper {
  position: relative;
  width: 100%;
  min-height: 4.1rem;
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
  align-items: flex-end;
  gap: 2rem;
  border-bottom: 0.1rem solid $blue;
  padding-bottom: 1rem;
  cursor: pointer;

  @include bp($point_2) {
    padding: 0.85rem 1.6rem !important;
  }

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
