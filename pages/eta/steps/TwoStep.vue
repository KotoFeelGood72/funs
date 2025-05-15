<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useETAStore, useETAStoreRefs } from "@/store/useETAStore";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import Select from "~/components/ui/inputs/Select.vue";
import CustomSelectPhone from "~/components/ui/inputs/CustomSelectPhone.vue";
import ContentView from "@/components/shared/ContentView.vue";
import AccardionSingle from "@/components/accardions/AccardionSingle.vue";
import VisaHeadSteps from "~/components/ui/VisaHeadSteps.vue";
import btn from "~/components/ui/buttons/btn.vue";

// стейт и схема из стора
const { getVisaByIdForm, fetchMainVisaForm } = useETAStore();
const { formShema, loading } = useETAStoreRefs();

// секции
const sections = computed(() => formShema.value?.sections || []);

// динамический form
const form = reactive<Record<string, any>>({});
watch(
  sections,
  (secs) => {
    secs.forEach((sec: any) =>
      sec.fields.forEach((f: any) => {
        if (!(f.name in form)) {
          form[f.name] = f.default_value ?? (f.type === "boolean" ? false : "");
        }
      })
    );
  },
  { immediate: true }
);

// аккордеоны
const openStates = reactive<Record<string, boolean>>({});
watch(
  sections,
  (secs) => {
    secs.forEach((s: any) => {
      if (!(s.id in openStates)) openStates[s.id] = false;
    });
  },
  { immediate: true }
);

// получение схемы из API
const route = useRoute();
const router = useRouter();

const isCurrentRequestId = computed(() => {
  return route.query.request_id;
});
onMounted(async () => {
  const id = route.query.visa_id;
  if (typeof id === "string") {
    await getVisaByIdForm(id);
    // если API вернул начальные значения
    Object.assign(form, formShema.value);
  }
});

// вспомогательные из вашего кода
// function checkDependency(dep: Record<string, any>) {
//   const [[key, val]] = Object.entries(dep);
//   return form[key] === val;
// }

function checkDependency(dep: Record<string, any>) {
  const [[key, expected]] = Object.entries(dep);

  // Пытаемся найти ближайшее существующее поле в form (например, заменить _last_3_years на "")
  const fallbackKey = key.replace(/_last_3_years$/, "");
  const realKey = key in form ? key : fallbackKey;

  const actual = form[realKey];
  const normalizedActual = actual === "Да" ? true : actual === "Нет" ? false : actual;

  return normalizedActual === expected;
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

  // select или массив options
  if (field.options && field.options.length) {
    return {
      ...common,
      options: field.options.map((o: any) => ({
        label: o.label,
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

// ───── ВАЛИДАЦИЯ ─────
const errors = reactive<Record<string, string>>({});

function validateForm(): boolean {
  // очистим старые ошибки
  Object.keys(errors).forEach((k) => delete errors[k]);

  // пройдём по всем полям
  sections.value.forEach((sec: any) => {
    sec.fields.forEach((f: any) => {
      // проверяем зависимость, если есть условие отображения
      if (f.dependency && !checkDependency(f.dependency)) return;

      // если обязательное и пусто
      const val = form[f.name];
      const isEmpty =
        val === "" ||
        val === null ||
        val === undefined ||
        (Array.isArray(val) && val.length === 0);
      if (f.required && isEmpty) {
        errors[f.name] = "Это поле обязательно";
      }
    });
  });

  return Object.keys(errors).length === 0;
}

function onNext() {
  if (!validateForm()) {
    // здесь можно прокрутить к первой ошибке
    return;
  }
  // TODO: ваша логика перехода дальше
  console.log("Форма валидна, отправляем:", form);
}

const onSubmit = () => {
  if (!validateForm()) return;

  fetchMainVisaForm(
    router,
    isCurrentRequestId.value,
    formShema.value?.visa_type_id,
    form
  );
};
</script>

<template>
  <ContentView :is-loading="loading">
    <VisaHeadSteps :title="formShema?.country_name + ' - ' + formShema?.visa_name" />
    <template v-for="section in sections" :key="section.id">
      <template
        v-if="
          section.id !== 'india_previous_visit' ||
          checkDependency({ visited_india_before: true })
        "
      >
        <div class="section">
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
                <template
                  v-if="!field.dependent_on || checkDependency(field.dependent_on)"
                >
                  <div v-if="componentFor(field) === Select" class="field-item">
                    <label :for="field.name" class="field-item__label">
                      {{ propsFor(field).label }}
                    </label>
                    <Select v-model="form[field.name]" v-bind="propsFor(field)" />
                  </div>

                  <component
                    v-else
                    :is="componentFor(field)"
                    v-model="form[field.name]"
                    v-bind="propsFor(field)"
                  />
                </template>
              </template>
            </div>
          </AccardionSingle>
        </div>
      </template>
    </template>

    <div class="form_bottom">
      <btn name="Далее" @click="onSubmit()" />
    </div>
  </ContentView>
</template>

<style scoped lang="scss">
.section {
  margin-bottom: 1.5rem;
}
.section-desc {
  margin: 2rem 0 3rem 0;
  color: $gray;
  font-size: 1.8rem;
}
.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.field-item__label {
  font-size: 1.6rem;
  color: $gray;
  margin-bottom: 1rem;
  display: flex;
}

.form_bottom {
  @include flex-end;
}
</style>
