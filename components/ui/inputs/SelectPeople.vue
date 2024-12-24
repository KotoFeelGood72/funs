<script setup lang="ts">
import { ref, computed, nextTick, watch } from "vue";
import btn from "../buttons/btn.vue";

// Пропсы для v-model
const props = defineProps<{
  class_type: any;
  adults: number;
  children: number;
}>();

// Эмитим изменения для синхронизации с родителем
const emit = defineEmits([
  "update:class_type",
  "update:adults",
  "update:children",
  "update:childrenAges",
]);

// Локальные состояния
const classType = ref(props.class_type || "ECONOMY");
const adults = ref(props.adults || 1);
const children = ref(props.children || 0);
const childrenAges = ref<number[]>([]);

// Синхронизация локальных значений с v-model
watch(classType, (newValue) => {
  emit("update:class_type", newValue);
});
watch(adults, (newValue) => {
  emit("update:adults", newValue);
});
watch(children, (newValue) => {
  // Устанавливаем массив возрастов в зависимости от количества детей
  if (newValue > childrenAges.value.length) {
    childrenAges.value = [
      ...childrenAges.value,
      ...Array(newValue - childrenAges.value.length).fill(5), // Значение по умолчанию
    ];
  } else {
    childrenAges.value = childrenAges.value.slice(0, newValue);
  }

  emit("update:children", newValue);
  emit("update:childrenAges", childrenAges.value);
});
watch(childrenAges, (newValue) => {
  emit("update:childrenAges", newValue);
});

const isDropdownVisible = ref(false);
const dropdownPosition = ref("bottom");
const wrapper = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);

const headerText = computed(() => {
  let text = "";

  if (adults.value > 0) {
    text += `Взрослый — ${adults.value}`;
  }

  if (children.value > 0) {
    text += `${adults.value > 0 ? ", " : ""}Детей — ${children.value}`;
  }

  return text || "Не указано";
});

const toggleDropdown = async () => {
  isDropdownVisible.value = !isDropdownVisible.value;

  if (isDropdownVisible.value) {
    await nextTick();
    calculateDropdownPosition();
  }
};

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

const increaseChildren = () => children.value++;
const decreaseChildren = () => {
  if (children.value > 0) children.value--;
};

// Подтверждение выбора
const confirmSelection = () => {
  isDropdownVisible.value = false;
};
</script>

<template>
  <div class="people-wrapper" ref="wrapper">
    <div class="header" @click="toggleDropdown">
      <div class="header_col">
        <p>{{ headerText }}</p>
      </div>
      <div class="header_ic">
        <Icon name="f:user" :size="14" />
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
            <p>Дети до 12 лет</p>
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
          <div class="txt">
            <p>Текст</p>
            <span
              >Чтобы найти подходящий вариант для вашей группы и показать
              корректные цены, нам нужно знать возраст ваших детей на момент
              отъезда.</span
            >
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
  width: 100%;
  min-height: 4.1rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.header_ic {
  @include flex-center;
  // margin-bottom: .5rem;
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
  border: 0.1rem solid $gray-light;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 #00000017;
  max-width: 31.5rem;
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
  overflow: hidden;

  span {
    font-size: 1.8rem;
    font-family: $font_3;
  }
  button {
    width: 4rem;
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
</style>
