<script setup lang="ts">
import { reactive, watch } from "vue";
import Inputs from "../ui/inputs/Inputs.vue";
import CustomSelectPhone from "../ui/inputs/CustomSelectPhone.vue";
import Select from "../ui/inputs/Select.vue";

interface Field {
  name: string;
  type: "string" | "select" | string;
  required: boolean;
  label?: string;
  placeholder?: string;
  // теперь жёстче приводим под нужный формат
  options?: { value: any; label: string }[];
  default_value?: any;
}

// пропсы, эмиты оставляем без изменений
const props = defineProps<{
  fields: Field[];
  modelValue: Record<string, any>;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
}>();

// Функция, чтобы для select-полей найти дефолт
function getInitialValue(f: Field) {
  // если папа модельку передал — берём её
  if (
    props.modelValue[f.name] !== undefined &&
    props.modelValue[f.name] !== null
  ) {
    return props.modelValue[f.name];
  }
  // иначе если API дал default_value — берём его
  if (f.default_value !== undefined && f.default_value !== null) {
    return f.default_value;
  }
  // иначе, если это селект и есть опции — первый value
  if (f.type === "select" && Array.isArray(f.options) && f.options.length) {
    return f.options[0].value;
  }
  // иначе пустая строка
  return "";
}

// Инициализируем form сразу с первым значением у селектов
const form = reactive(
  Object.fromEntries(props.fields.map((f) => [f.name, getInitialValue(f)]))
) as Record<string, any>;

// синхронизируемся с внешним modelValue, если он поменяется
watch(
  () => props.modelValue,
  (newVal) => {
    props.fields.forEach((f) => {
      form[f.name] = newVal[f.name] ?? getInitialValue(f);
    });
  },
  { deep: true }
);

// пушим наружу изменения
watch(form, (val) => emit("update:modelValue", { ...val }), { deep: true });

// валидация без изменений
const errors = reactive<Record<string, string>>({});
const validate = (): boolean => {
  Object.keys(errors).forEach((k) => delete errors[k]);
  props.fields.forEach((f) => {
    if (f.required && !form[f.name]) {
      errors[f.name] = "Это поле обязательно для заполнения";
    }
  });
  return Object.keys(errors).length === 0;
};
defineExpose({ validate });
</script>

<template>
  <form class="visa_short_form" @submit.prevent>
    <div
      v-for="field in fields"
      :key="field.name"
      class="visa_short_form__field"
    >
      <!-- <label v-if="field.label" class="visa_short_form__label">
        {{ field.label }}
      </label> -->

      <CustomSelectPhone
        v-if="field.name === 'institution_phone'"
        v-model="form[field.name]"
        :id="field.name"
        :placeholder="field.placeholder || field.label"
      />

      <Select
        v-else-if="field.type === 'select'"
        v-model="form[field.name]"
        :id="field.name"
        :options="field.options"
        :placeholder="field.placeholder || field.label"
      />

      <Inputs
        v-else
        v-model="form[field.name]"
        :id="field.name"
        type="text"
        :placeholder="field.placeholder || field.label"
      />

      <!-- сообщение об ошибке -->
      <span v-if="errors[field.name]" class="visa_short_form__error">
        {{ errors[field.name] }}
      </span>
    </div>
  </form>
</template>

<style scoped lang="scss">
.visa_short_form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 2rem;
  &__field {
    display: flex;
    flex-direction: column;

    // если это единственное поле в последнем ряду (2n+1 и последнее)
    &:nth-last-child(1):nth-child(2n + 1) {
      grid-column: 1 / -1;
    }
  }
}

.visa_short_form__field {
  display: flex;
  flex-direction: column;
  position: relative;
}

.visa_short_form__error {
  color: red;
  font-size: 1.2rem;
  position: absolute;
  bottom: -2.5rem;
  left: 0;
}
</style>
