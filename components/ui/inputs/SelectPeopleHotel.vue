<template>
  <div class="people-wrapper" ref="wrapper">
    <div class="header" @click="toggleDropdown">
      <div class="header_col">
        <p>{{ passengerText }}</p>
      </div>
      <div class="header_ic">
        <Icon name="ic:baseline-minus" :size="16" />
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
              <Icon name="ic:baseline-minus" />
            </button>
            <span>{{ ticketHotel.num }}</span>
            <button @click="increaseAdults">
              <Icon name="ic:baseline-plus" />
            </button>
          </div>
        </div>

        <div class="counter">
          <p>Дети</p>
          <div class="counter-buttons">
            <button @click="decreaseChildren">
              <Icon name="ic:baseline-minus" />
            </button>
            <span>{{ ticketHotel.children }}</span>
            <button @click="increaseChildren">
              <Icon name="ic:baseline-plus" />
            </button>
          </div>
        </div>
        <div class="counter">
          <p>Кол-во звезд</p>
          <div class="counter-buttons">
            <button @click="decreaseHotelClass">
              <Icon name="ic:baseline-minus" />
            </button>
            <span>{{ ticketHotel.hotel_class }}</span>
            <button @click="increaseHotelClass">
              <Icon name="ic:baseline-plus" />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useHotelStore, useHotelStoreRefs } from "~/store/useHotelStore";

const { createPassengersHotel } = useHotelStore();
const { ticketHotel } = useHotelStoreRefs();

const isDropdownVisible = ref(false);
const dropdownPosition = ref("bottom");
const wrapper = ref<HTMLElement | null>(null);

// Текст с правильными склонениями
const passengerText = computed(() => {
  const total = ticketHotel.value.num + ticketHotel.value.children;
  return `${total} пассажир${total === 1 ? "" : "а"}`;
});

const toggleDropdown = async () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  if (isDropdownVisible.value) {
    await nextTick();
    calculateDropdownPosition();
  }
};

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

  dropdownPosition.value = wrapperRect.bottom + 200 > viewportHeight ? "top" : "bottom";
};

const increaseAdults = () => {
  ticketHotel.value.num++;
  createPassengersHotel();
};

const decreaseAdults = () => {
  if (ticketHotel.value.num > 1) {
    ticketHotel.value.num--;
    createPassengersHotel();
  }
};
const increaseChildren = () => ticketHotel.value.children++;
const decreaseChildren = () =>
  ticketHotel.value.children > 0 && ticketHotel.value.children--;
const increaseHotelClass = () => {
  if (ticketHotel.value.hotel_class < 5) {
    ticketHotel.value.hotel_class++;
  }
};

const decreaseHotelClass = () => {
  if (ticketHotel.value.hotel_class > 1) {
    ticketHotel.value.hotel_class--;
  }
};

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
}
.header {
  @include flex-space;
  align-items: flex-end;
  gap: 2rem;
  border-bottom: 0.1rem solid $blue;
  padding-bottom: 1rem;
  cursor: pointer;

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

  p {
    font-size: 1.6rem;
    font-family: $font_3;
    @include flex-start;
    color: $dark;
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
  }
  button {
    flex-grow: 1;
    height: 4rem;
    cursor: pointer;
    @include flex-center;
    transition: all 0.3s ease-in-out;
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
