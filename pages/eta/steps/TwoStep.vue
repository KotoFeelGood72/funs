<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useETAStore, useETAStoreRefs } from "@/store/useETAStore";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import Select from "~/components/ui/inputs/Select.vue";
import CustomSelectPhone from "~/components/ui/inputs/CustomSelectPhone.vue";
import ContentView from "@/components/shared/ContentView.vue";
import AccardionSingle from "@/components/accardions/AccardionSingle.vue";

// — Удаляем defaultSections entirely —

// вместо этого достаём schema из стора:
const { getVisaByIdForm } = useETAStore();
const { formShema } = useETAStoreRefs();

// секции берем из formShema.value
const sections = computed(() => formShema.value.sections || []);

// динамически строим пустой form на основе того, что пришло из schema
const form = reactive<Record<string, any>>({});

watch(
  sections,
  (secs) => {
    secs.forEach((sec) =>
      sec.fields.forEach((f: any) => {
        // если ещё не инициализовано
        if (!(f.name in form)) {
          form[f.name] = f.default_value ?? (f.type === "boolean" ? false : "");
        }
      })
    );
  },
  { immediate: true }
);

// аккордеоны: по умолчанию всё закрыто
const openStates = reactive({} as Record<string, boolean>);
watch(
  sections,
  (secs) => {
    secs.forEach((s: any) => {
      if (!(s.id in openStates)) {
        openStates[s.id] = false;
      }
    });
  },
  { immediate: true }
);

const route = useRoute();

onMounted(async () => {
  const id = route.query.visa_id;
  if (typeof id === "string") {
    // метод должен заполнить formShema.value нужными полями
    await getVisaByIdForm(id);
    // и после этого перезапишем наш form значениями:
    Object.assign(form, formShema.value);
  }
});

function checkDependency(dep: Record<string, any>) {
  const [[key, val]] = Object.entries(dep);
  return form[key] === val;
}

function componentFor(field: any) {
  if (field.type === "boolean") return Select;
  if (field.options && field.options.length) return Select;
  if (/phone|mobile|contact/.test(field.name)) return CustomSelectPhone;
  return Inputs;
}

function propsFor(field: any) {
  const common = {
    id: field.name,
    placeholder: field.label,
    label: field.required ? field.label + " *" : field.label,
  };
  if (field.type === "boolean") {
    return {
      ...common,
      options: [
        { name: "Да", value: true },
        { name: "Нет", value: false },
      ],
    };
  }
  if (field.options && field.options.length) {
    return {
      ...common,
      options: field.options.map((o: any) => ({
        name: o.name,
        value: o.value,
      })),
    };
  }
  const typeMap: Record<string, string> = {
    string: "text",
    date: "date",
    number: "number",
  };
  return {
    ...common,
    type: typeMap[field.type] || "text",
  };
}
</script>

<template>
  <ContentView :is-loading="false">
    <div v-for="section in sections" :key="section.id" class="section">
      <AccardionSingle
        v-model="openStates[section.id]"
        :title="section.title"
        is-open
      >
        <p v-if="section.description" class="section-desc">
          {{ section.description }}
        </p>

        <div class="fields-grid">
          <template v-for="field in section.fields" :key="field.name">
            <!-- Если это Select (т.е. field.options или boolean) -->
            <div v-if="componentFor(field) === Select" class="field-item">
              <label :for="field.name" class="field-item__label">{{
                propsFor(field).label
              }}</label>

              <Select v-model="form[field.name]" v-bind="propsFor(field)" />
            </div>

            <!-- Иначе просто рендерим Inputs или CustomSelectPhone -->
            <component
              v-else
              :is="componentFor(field)"
              v-model="form[field.name]"
              v-bind="propsFor(field)"
            />
          </template>
        </div>
      </AccardionSingle>
    </div>
  </ContentView>
</template>

<style scoped lang="scss">
.section {
  margin-bottom: 1.5rem;
}
.section-desc {
  margin: 2rem 0 1rem;
  color: $gray;
  font-size: 1.8rem;
}
.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
</style>
