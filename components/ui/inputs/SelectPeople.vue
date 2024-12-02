<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import Select from "./Select.vue";
import btn from "../buttons/btn.vue";
// import Icon from "@/components/Icon.vue";

const isDropdownVisible = ref(false);
const dropdownPosition = ref("bottom");
const wrapper = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);

// Счётчики
const adults = ref(2);
const children = ref(0);
const rooms = ref(1);
const childAges = ref<number[]>([]);

// Вычисляемое свойство для отображения текста в заголовке
const headerText = computed(() => {
  return `Взрослых — ${adults.value}, Детей — ${children.value}`;
});

// Открытие/закрытие выпадающего списка
const toggleDropdown = async () => {
  isDropdownVisible.value = !isDropdownVisible.value;

  if (isDropdownVisible.value) {
    await nextTick();
    calculateDropdownPosition();
  }
};

// Определение позиции выпадающего списка
const calculateDropdownPosition = () => {
  if (!wrapper.value || !dropdown.value) return;

  const wrapperRect = wrapper.value.getBoundingClientRect();
  const dropdownHeight = dropdown.value.offsetHeight;
  const viewportHeight = window.innerHeight;

  if (wrapperRect.bottom + dropdownHeight > viewportHeight) {
    dropdownPosition.value = "top";
  } else {
    dropdownPosition.value = "bottom";
  }
};

// Логика счётчиков
const increaseAdults = () => adults.value++;
const decreaseAdults = () => {
  if (adults.value > 1) adults.value--;
};

const increaseChildren = () => {
  children.value++;
  childAges.value.push(0);
};
const decreaseChildren = () => {
  if (children.value > 0) {
    children.value--;
    childAges.value.pop();
  }
};

const increaseRooms = () => rooms.value++;
const decreaseRooms = () => {
  if (rooms.value > 1) rooms.value--;
};

const confirmSelection = () => {
  console.log({
    adults: adults.value,
    children: children.value,
    rooms: rooms.value,
    childAges: childAges.value,
  });
  isDropdownVisible.value = false;
};
</script>

<template>
  <div class="people-wrapper" ref="wrapper">
    <div class="header" @click="toggleDropdown">
      <div class="header_col">
        <span>Гостей</span>
        <!-- Динамически обновляем текст в заголовке -->
        <p>{{ headerText }}</p>
      </div>
      <div class="header_ic">
        <Icon name="f:user" :size="14"/>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="isDropdownVisible"
        :class="['dropdown', dropdownPosition]"
        ref="dropdown"
      >
        <div class="counter-container">
          <div class="counter">
            <p>Взрослых</p>
            <div class="counter-buttons">
              <button @click="decreaseAdults">
                <Icon name="f:minus" />
              </button>
              <span>{{ adults }}</span>
              <button @click="increaseAdults">
                <Icon name="f:plus" />
              </button>
            </div>
          </div>

          <div class="counter">
            <p>Детей</p>
            <div class="counter-buttons">
              <button @click="decreaseChildren">
                <Icon name="f:minus" />
              </button>
              <span>{{ children }}</span>
              <button @click="increaseChildren">
                <Icon name="f:plus" />
              </button>
            </div>
          </div>

          <div v-if="children > 0">
            <Select
              v-for="(age, index) in children"
              :key="index"
              :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
              v-model="childAges[index]"
              :label="'Возраст ребёнка ' + (index + 1)"
            />
          </div>

          <div class="txt">
            <p>Текст</p>
            <span>
              Чтобы найти подходящий вариант для вашей группы и показать
              корректные цены, нам нужно знать возраст ваших детей на момент
              отъезда.
            </span>
          </div>

          <div class="counter">
            <p>Номера</p>
            <div class="counter-buttons">
              <button @click="decreaseRooms">
                <Icon name="f:minus" />
              </button>
              <span>{{ rooms }}</span>
              <button @click="increaseRooms">
                <Icon name="f:plus" />
              </button>
            </div>
          </div>
        </div>
        <div class="people__bottom">
          <btn
            name="Готово"
            @click="confirmSelection"
            style="justify-content: center"
            theme="primary"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.people-wrapper {
  position: relative;
}

.header_ic {
  @include flex-center;
  margin-bottom: .5rem;
  margin-right: 1rem;
}
.header {
  @include flex-space;
  align-items: flex-end;
  gap: 2rem;
  border-bottom: 0.1rem solid $blue;
  padding-bottom: 0.5rem;
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
  border: 0.1rem solid $gray-light;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 #00000017;
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
    font-size: 1.4rem;
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

  span {
    font-size: 1.8rem;
    font-family: $font_3;
  }
  button {
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    @include flex-center;
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
</style>
