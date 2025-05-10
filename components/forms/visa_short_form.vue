<template>
  <form class="visa_short_form">
    <div v-for="field in fields" :key="field.name" class="visa_short_form__field">
      <!-- Телефон -->
      <CustomSelectPhone
        v-if="field.name === 'institution_phone'"
        v-model="form[field.name]"
        :id="field.name"
        :placeholder="field.label"
      />

      <!-- Select -->
      <Select
        v-else-if="field.type === 'select'"
        v-model="form[field.name]"
        :id="field.name"
        :options="
          (field.options || []).map((opt) => ({
            value: opt.value,
            name: opt.label,
          }))
        "
        :placeholder="field.label"
      />

      <!-- Обычный текстовый инпут -->
      <Inputs
        v-else
        v-model="form[field.name]"
        :id="field.name"
        type="text"
        :placeholder="field.label"
      />
    </div>
  </form>
</template>

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
  options?: { name: string; value: any }[];
  // если у вас есть default_value в API:
  default_value?: any;
}

// props и emits
const props = defineProps<{
  fields: Field[];
  modelValue: Record<string, any>;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
}>();

// Инициализируем объект form из поля props.fields
// (если default_value не нужен — просто замените f.default_value на '')
const form = reactive(
  Object.fromEntries(
    props.fields.map((f) => [f.name, props.modelValue[f.name] ?? f.default_value ?? ""])
  )
) as Record<string, any>;

// При изменении родительского modelValue — синхронизируем (необязательно, если вам не нужно)
watch(
  () => props.modelValue,
  (val) => {
    for (const key of Object.keys(form)) {
      form[key] = val[key] ?? "";
    }
  },
  { deep: true }
);

// При любом изменении form — пушим наружу
watch(form, (val) => emit("update:modelValue", { ...val }), { deep: true });
</script>

<style scoped lang="scss">
.visa_short_form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  row-gap: 16px;
}

.visa_short_form__field {
  display: flex;
  flex-direction: column;
}

.visa_short_form__label {
  font-size: 14px;
  font-weight: 500;
  color: #005fa8;
  margin-bottom: 4px;
}
</style>
