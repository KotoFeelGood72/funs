<template>
  <ClientOnly>
    <div class="select" :class="{ active: displayName || dropdownOpen }">
      <input
        type="text"
        :value="displayName"
        @focus="toggleDropdown(true)"
        @blur="toggleDropdown(false)"
        @input="onInput($event)"
        @keydown="handleKeyDown"
        class="input"
        :class="{ 'has-error': !!props.error }"
        :placeholder="label"
      />

      <ul v-if="dropdownOpen && places.length > 0 && places" class="options">
        <li
          v-for="(option, index) in places"
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
        <li v-if="places.length === 0" class="no-options">Нет доступных вариантов</li>
      </ul>
      <ul
        v-if="dropdownOpen && (places.length > 0 || nationals.length > 0)"
        class="options"
      >
        <li
          v-for="(option, index) in combinedOptions"
          :key="index"
          :class="{ selected: index === selectedIndex }"
          @mousedown="selectOption(option)"
        >
          <p>{{ option.name }}</p>
          <p class="val">{{ option.value }}</p>
        </li>
      </ul>

      <ul
        v-if="dropdownOpen && places.length === 0 && nationals.length === 0"
        class="options"
      >
        <li class="no-options">Нет доступных вариантов</li>
      </ul>
    </div></ClientOnly
  >
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, watchEffect } from "vue";
import { useFetchPlace } from "@/composables/usePlace";

const props = defineProps<{
  modelValue: any;
  label?: string;
  national?: boolean;
  error?: boolean | string | null;
}>();
const emit = defineEmits(["update:modelValue"]);

const { fetchPlace, clear, places, fetchNational, nationals } = useFetchPlace();

const dropdownOpen = ref(false);
const selectedIndex = ref(-1);

const displayName = computed(() => props.modelValue?.name || "");

watchEffect(() => {
  if (displayName.value && displayName.value.length > 1 && !props.national) {
    fetchPlace(displayName.value);
  } else if (displayName.value && displayName.value.length > 1 && props.national) {
    fetchNational(displayName.value);
  } else {
    clear();
  }
});

const combinedOptions = computed(() => {
  return places.value.length > 0 ? places.value : nationals.value;
});

watchEffect(() => {
  if (places.value.length > 0 && typeof props.modelValue === "string") {
    emit("update:modelValue", places.value[0]);
  }
});

const toggleDropdown = (open: boolean) => {
  setTimeout(() => {
    dropdownOpen.value = open;
    if (!open) {
      clear();
      selectedIndex.value = -1;
    }
  }, 50);
};

const selectOption = (option: any) => {
  emit("update:modelValue", option);
  clear();
  toggleDropdown(false);
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const userInput = target.value;

  const matchedOption = combinedOptions.value.find(
    (option: any) => option.name.toLowerCase() === userInput.toLowerCase()
  );

  if (matchedOption) {
    emit("update:modelValue", matchedOption);
  } else {
    emit("update:modelValue", {
      name: userInput,
      value: props.modelValue?.value || "",
    });
  }

  selectedIndex.value = -1;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (combinedOptions.value.length === 0) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedIndex.value = Math.min(
      selectedIndex.value + 1,
      combinedOptions.value.length - 1
    );
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (event.key === "Enter" && selectedIndex.value !== -1) {
    event.preventDefault();
    selectOption(combinedOptions.value[selectedIndex.value]);
  }
};

watchEffect(() => {
  if (typeof props.modelValue === "string") {
    emit("update:modelValue", {
      name: props.modelValue,
      value: "",
    });
  }
});
</script>

<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;

  .input {
    @include app;
    font-family: $font_2;
    padding: 1.2rem 2rem;
    width: 100%;
    background: transparent;
    z-index: 1;
    border: 0.1rem solid #d8d7d7;
    font-size: 1.8rem;
    cursor: pointer;
    height: 4.6rem;
    border-radius: 0.5rem;
    @include bp($point_2) {
      font-size: 1.4rem;
    }

    &.has-error {
      border-color: red;
      &::placeholder {
        color: red;
      }
    }
  }

  .options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    max-height: 20rem;
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
