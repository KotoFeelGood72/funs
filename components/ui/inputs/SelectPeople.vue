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
        <div class="counter">
          <p>Взрослые</p>
          <div class="counter-buttons">
            <button @click="decreaseAdults">
              <Icon name="f:minus" />
            </button>
            <span>{{ ticket.adults }}</span>
            <button @click="increaseAdults">
              <Icon name="f:plus" />
            </button>
          </div>
        </div>

        <div class="counter">
          <p>Дети</p>
          <div class="counter-buttons">
            <button @click="decreaseChildren">
              <Icon name="f:minus" />
            </button>
            <span>{{ ticket.children }}</span>
            <button @click="increaseChildren">
              <Icon name="f:plus" />
            </button>
          </div>
        </div>
        <Checkbox
          id="isBusinessClass"
          label="Бизнес класс"
          value="BUSINESS"
          v-model="ticket.class_type"
          name="isBusinessClass"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import Checkbox from "./Checkbox.vue";
import {
  useTicketAirStore,
  useTicketAirStoreRefs,
} from "~/store/useTicketAirStore";

const { createPassengers } = useTicketAirStore();
const { ticket } = useTicketAirStoreRefs();

const isDropdownVisible = ref(false);
const dropdownPosition = ref("bottom");
const wrapper = ref<HTMLElement | null>(null);

const classTypeTranslation: any = {
  ECONOMY: "Эконом",
  BUSINESS: "Бизнес",
};

// Текст с правильными склонениями
const passengerText = computed(() => {
  const total = ticket.value.adults + ticket.value.children;
  return `${total} пассажир${total === 1 ? "" : "а"} (${
    classTypeTranslation[ticket.value.class_type]
  })`;
});

const toggleDropdown = async () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  if (isDropdownVisible.value) {
    await nextTick();
    calculateDropdownPosition();
  }
};

watch(
  () => ticket.value.class_type,
  (newValue) => {
    if (!newValue) {
      ticket.value.class_type = "ECONOMY";
    }
  }
);
// Закрыть, если кликнули вне области
const closeDropdown = (event: MouseEvent) => {
  if (
    isDropdownVisible.value &&
    wrapper.value &&
    !wrapper.value.contains(event.target as Node)
  ) {
    isDropdownVisible.value = false;
  }
};

// Рассчитать позицию дропдауна
const calculateDropdownPosition = () => {
  if (!wrapper.value) return;

  const wrapperRect = wrapper.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  dropdownPosition.value =
    wrapperRect.bottom + 200 > viewportHeight ? "top" : "bottom";
};

const increaseAdults = () => {
  ticket.value.adults++;

  createPassengers();
};

const decreaseAdults = () => {
  if (ticket.value.adults > 1) {
    ticket.value.adults--;
    createPassengers();
  }
};
const increaseChildren = () => ticket.value.children++;
const decreaseChildren = () =>
  ticket.value.children > 0 && ticket.value.children--;

// Слушатели событий
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

.counter {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 1.6rem;

  @include bp($point_2) {
    grid-gap: 1rem;
  }

  p {
    font-size: 1.6rem;
    font-family: $font_3;
    @include flex-start;
    color: $dark;

    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
}

.counter-buttons {
  border: 0.1rem solid $light;
  border-radius: 0.8rem;
  @include flex-center;
  gap: 1.6rem;
  overflow: hidden;

  span {
    font-size: 1.8rem;
    font-family: $font_3;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
  button {
    flex-grow: 1;
    height: 4rem;
    cursor: pointer;
    @include flex-center;
    transition: all 0.3s ease-in-out;

    @include bp($point_2) {
      height: 3rem;
    }
    &:hover {
      background-color: $gray-light;
    }
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
