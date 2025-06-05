<template>
  <div class="search">
    <input type="search" v-model="localValue" :id="id" placeholder="Поиск" />
    <div class="submit">
      <Icon name="si:search-line" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
  }>(),
  {
    modelValue: "",
    id: "",
  }
);
const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss">
.search {
  @include flex-space;
  border: 0.1rem solid #d9d9d9;
  border-radius: 3rem;
  // max-width: 43.7rem;
  // width: 100%;
  flex-grow: 1;
}

input {
  @include app;
  font-size: 1.8rem;
  width: 100%;
  padding: 1.6rem;
}

.submit {
  @include flex-center;
  cursor: pointer;
  margin-right: 1.6rem;
}
</style>
