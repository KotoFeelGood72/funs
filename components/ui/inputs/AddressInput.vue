<template>
  <div class="address-input">
    <input
      type="text"
      v-model="query"
      @input="onInput"
      :placeholder="placeholder"
      class="address-input__field"
    />

    <ul v-if="suggestions.length" class="address-input__list">
      <li
        v-for="item in suggestions"
        :key="item.value"
        @click="select(item)"
        class="address-input__item"
      >
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

// ваш ключ из .env / import.meta.env
const DADATA_TOKEN = import.meta.env.VITE_DADATA_API_KEY as string;

interface Suggestion {
  value: string;
}

// Пропсы: только modelValue
const props = defineProps<{ modelValue: string }>();

// Правильная типизация emit для события update:modelValue
const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

// Локальный ввод и подсказки
const query = ref(props.modelValue);
const suggestions = ref<Suggestion[]>([]);

// Плейсхолдер
const placeholder = computed(() => "Начните вводить адрес…");

// Дебаунс
let timer: ReturnType<typeof setTimeout>;
function onInput() {
  // сразу поднимаем введённое наверх
  emit("update:modelValue", query.value);

  clearTimeout(timer);
  timer = setTimeout(fetchSuggestions, 300);
}

async function fetchSuggestions() {
  if (!query.value) {
    suggestions.value = [];
    return;
  }
  try {
    const res = await fetch(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${DADATA_TOKEN}`,
        },
        body: JSON.stringify({ query: query.value }),
      }
    );
    const json = await res.json();
    suggestions.value = json.suggestions || [];
  } catch (e) {
    console.error(e);
  }
}

function select(item: Suggestion) {
  query.value = item.value;
  emit("update:modelValue", item.value);
  suggestions.value = [];
}

// Синхронизируем, если modelValue от родителя меняется
watch(
  () => props.modelValue,
  (v) => {
    query.value = v;
  }
);
</script>

<style scoped lang="scss">
.address-input {
  position: relative;
  width: 100%;

  &__field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 4px 0 0;
    padding: 0;
    list-style: none;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
  }

  &__item {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: #f0f0f0;
    }
  }
}
</style>
