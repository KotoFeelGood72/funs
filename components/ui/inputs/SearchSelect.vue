<template>
  <ClientOnly>
    <div class="select" :class="{ active: displayName || dropdownOpen }">
      <label :class="{ active: dropdownOpen || displayName }" class="label">
        {{ label }}
      </label>

      <input
        type="text"
        :value="displayName"
        @focus="toggleDropdown(true)"
        @blur="toggleDropdown(false)"
        @input="onInput($event)"
        @keydown="handleKeyDown"
        class="input"
      />

      <ul v-if="dropdownOpen && options.length > 0" class="options">
        <li
          v-for="(option, index) in options"
          :key="index"
          :class="{ selected: index === selectedIndex }"
          @mousedown="selectOption(option)"
        >
          <p>
            {{ option.name }}
          </p>
          <p class="val">
            {{ option.value }}
          </p>
        </li>
        <li v-if="options.length === 0" class="no-options">
          Нет доступных вариантов
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, onMounted } from "vue";
import { useTicketAirStore } from "~/store/useTicketAirStore";

const props = defineProps<{
  options: Array<{ name: string; value: string }>;
  modelValue: any;
  defaultIndex?: number;
  label?: string;
  type?: "air" | "eta" | "hotel";
}>();

const emit = defineEmits(["update:modelValue"]);
const { clearPlace } = useTicketAirStore();

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const displayName = computed(() => localValue.value?.name || "");
const dropdownOpen = ref(false);
const selectedIndex = ref(-1);

const toggleDropdown = (open: boolean) => {
  setTimeout(() => {
    dropdownOpen.value = open;
    if (!open) {
      clearPlace();
      selectedIndex.value = -1;
    }
  }, 50);
};

const selectOption = (option: { name: string; value: string }) => {
  emit("update:modelValue", option);
  clearPlace();
  toggleDropdown(false);
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  target.value = value;
  emit("update:modelValue", { name: value, value: "" });
  selectedIndex.value = -1; // Сброс выбранного индекса при вводе
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedIndex.value = Math.min(
      selectedIndex.value + 1,
      props.options.length - 1
    );
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (event.key === "Enter" && selectedIndex.value !== -1) {
    event.preventDefault();
    selectOption(props.options[selectedIndex.value]);
  }
};

onMounted(() => {
  if (!localValue.value?.value && props.options.length > 0) {
    const defaultOption =
      props.options[props.defaultIndex || 0] || props.options[0];
    emit("update:modelValue", defaultOption);
  }
});
</script>

<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;

  .label {
    pointer-events: none;
    font-family: $font_2;
    font-size: 1.8rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1.6rem;
    transition: all 0.3s ease-in-out;
    color: $dark;

    @include bp($point_2) {
      font-size: 1.4rem;
    }

    &.active {
      color: $blue;
      top: 0;
      font-size: 1.4rem;
      @include bp($point_2) {
        font-size: 1rem;
      }
    }
  }

  .input {
    @include app;
    font-family: $font_2;
    padding: 1rem 1.6rem;
    width: 100%;
    background: transparent;
    z-index: 1;
    border-bottom: 0.1rem solid $blue;
    font-size: 1.8rem;
    cursor: pointer;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }

  .options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: $white;
    border: 0.1rem solid $light;
    border-radius: 0.5rem;
    z-index: 1000;

    li {
      font-size: 1.8rem;
      padding: 0.8rem 1rem;
      color: $dark;
      cursor: pointer;
      transition: background-color 0.2s;
      @include flex-space;
      @include bp($point_2) {
        font-size: 1.2rem;
      }

      &:hover {
        background-color: #f5f5f5;
      }

      &.selected {
        background-color: #e6f7ff;
        color: $blue;
      }
    }

    .no-options {
      padding: 0.8rem 1rem;
      color: #999;
    }
  }
}

.val {
  font-size: 1.4rem;
  font-family: $font_2;
  color: $blue;
  font-weight: 600;
  @include bp($point_2) {
    font-size: 1.2rem;
  }
}
</style>
