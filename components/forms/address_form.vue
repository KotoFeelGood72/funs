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
const props = defineProps<{
  address: string;
  phone: string;
}>();

const emit = defineEmits<{
  (e: "update:address", val: string): void;
  (e: "update:phone", val: string): void;
}>();

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
