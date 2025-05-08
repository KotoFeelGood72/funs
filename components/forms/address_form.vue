<template>
  <div class="address">
    <div class="grid">
      <div class="col">
        <AddressInput v-model="localAddress" />
      </div>
      <div class="col">
        <CustomSelectPhone v-model="localPhone" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AddressInput from "../ui/inputs/AddressInput.vue";
import CustomSelectPhone from "../ui/inputs/CustomSelectPhone.vue";

// --- 1. Определяем пропсы, включая два для v-model
const props = defineProps<{
  address: string;
  phone: string;
}>();

// --- 2. Определяем эмиты для обновления каждого model
const emit = defineEmits<{
  (e: "update:address", val: string): void;
  (e: "update:phone", val: string): void;
}>();

// --- 3. Проксируем каждый model в computed, чтобы можно было v-model внутри
const localAddress = computed<string>({
  get: () => props.address,
  set: (val) => emit("update:address", val),
});

const localPhone = computed<string>({
  get: () => props.phone,
  set: (val) => emit("update:phone", val),
});
</script>

<style scoped lang="scss">
.address {
  .label {
    font-weight: bold;
    margin-bottom: 4px;
  }
  .grid {
    display: flex;
    gap: 1rem;
  }
  .col {
    flex: 1;
  }
}
</style>
