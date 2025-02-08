<template>
  <div class="radios">
    <div class="radio" v-for="(item, i) in items" :key="'radio-items-' + i">
      <input
        type="radio"
        :id="'radio-items-' + i"
        :name="name"
        :value="item.val"
        v-model="localValue"
      />
      <label :for="'radio-items-' + i">
        <div class="ic" v-if="localValue === item.val">
          <Icon name="f:check" />
        </div>
        <p>{{ item.name }}</p>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: any[];
  name?: string;
  modelValue: any;
}>();

const emit = defineEmits(["update:modelValue"]);

// Локальная привязка к значению
const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss">
.radios {
  @include flex-start;
  gap: 0.8rem;

  @include bp($point_2) {
    display: none;
  }
}

.radio {
  label {
    background-color: $gray-light;
    padding: 1.6rem;
    @include flex-start;
    gap: 0.8rem;
    cursor: pointer;
    border-radius: 0.8rem;
    color: $gray;
    font-family: $font_2;
  }

  input {
    display: none;
    &:checked .ic {
      // background-color: $blue;
      display: flex;
    }
    &:checked + label {
      background-color: $blue;
      display: flex;
      color: $white;
    }
  }
}

.ic {
  @include flex-center;
  width: 1.6rem;
  height: 1.6rem;
}
</style>
